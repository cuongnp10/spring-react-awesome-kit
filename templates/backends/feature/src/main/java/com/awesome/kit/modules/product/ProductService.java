package com.awesome.kit.modules.product;

import com.awesome.kit.core.base.BaseService;
import com.awesome.kit.core.exception.BusinessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
class ProductService extends BaseService<Product, ProductDto.Response, Long> {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        super(productRepository, "Product");
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Transactional
    public ProductDto.Response create(ProductDto.CreateRequest request) {
        if (productRepository.existsBySkuAndIsDeletedFalse(request.sku())) {
            throw new BusinessException("Product SKU already exists: " + request.sku());
        }

        Product product = productMapper.toEntity(request);
        Product saved = productRepository.save(product);
        return productMapper.toResponse(saved);
    }

    @Transactional
    public ProductDto.Response update(Long id, ProductDto.UpdateRequest request) {
        Product product = getEntityById(id);
        productMapper.updateEntityFromDto(request, product);
        Product updated = productRepository.save(product);
        return productMapper.toResponse(updated);
    }

    @Override
    public ProductDto.Response toResponse(Product entity) {
        return productMapper.toResponse(entity);
    }
}
