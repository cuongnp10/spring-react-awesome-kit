package com.awesome.kit.service.impl;

import com.awesome.kit.core.exception.BusinessException;
import com.awesome.kit.core.exception.ResourceNotFoundException;
import com.awesome.kit.dto.request.ProductCreateRequest;
import com.awesome.kit.dto.request.ProductUpdateRequest;
import com.awesome.kit.dto.response.PageResponse;
import com.awesome.kit.dto.response.ProductResponse;
import com.awesome.kit.entity.Product;
import com.awesome.kit.mapper.ProductMapper;
import com.awesome.kit.repository.ProductRepository;
import com.awesome.kit.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ProductResponse> getProducts(Pageable pageable) {
        Page<Product> page = productRepository.findAllByIsDeletedFalse(pageable);
        return PageResponse.from(page, productMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return productMapper.toResponse(product);
    }

    @Override
    public ProductResponse createProduct(ProductCreateRequest request) {
        if (productRepository.existsBySkuAndIsDeletedFalse(request.sku())) {
            throw new BusinessException("Product with SKU '" + request.sku() + "' already exists", HttpStatus.CONFLICT);
        }
        Product product = productMapper.toEntity(request);
        Product savedProduct = productRepository.save(product);
        return productMapper.toResponse(savedProduct);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductUpdateRequest request) {
        Product product = productRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        productMapper.updateEntityFromRequest(request, product);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        product.setDeleted(true);
        productRepository.save(product);
    }
}
