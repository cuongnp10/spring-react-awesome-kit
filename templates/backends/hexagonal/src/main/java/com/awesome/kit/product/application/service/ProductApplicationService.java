package com.awesome.kit.product.application.service;

import com.awesome.kit.core.exception.BusinessException;
import com.awesome.kit.core.exception.ResourceNotFoundException;
import com.awesome.kit.product.adapter.web.response.PageResponse;
import com.awesome.kit.product.application.dto.CreateProductCommand;
import com.awesome.kit.product.application.dto.ProductView;
import com.awesome.kit.product.application.dto.UpdateProductCommand;
import com.awesome.kit.product.domain.model.Money;
import com.awesome.kit.product.domain.model.Product;
import com.awesome.kit.product.domain.model.ProductId;
import com.awesome.kit.product.domain.ports.inbound.CreateProductUseCase;
import com.awesome.kit.product.domain.ports.inbound.DeleteProductUseCase;
import com.awesome.kit.product.domain.ports.inbound.GetProductQuery;
import com.awesome.kit.product.domain.ports.inbound.UpdateProductUseCase;
import com.awesome.kit.product.domain.ports.outbound.ProductRepositoryPort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductApplicationService implements CreateProductUseCase, GetProductQuery, UpdateProductUseCase, DeleteProductUseCase {

    private final ProductRepositoryPort productRepositoryPort;

    public ProductApplicationService(ProductRepositoryPort productRepositoryPort) {
        this.productRepositoryPort = productRepositoryPort;
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ProductView> getProducts(Pageable pageable) {
        Page<Product> page = productRepositoryPort.findAll(pageable);
        return PageResponse.from(page, ProductView::fromDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductView getProductById(ProductId id) {
        Product product = productRepositoryPort.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id.value()));
        return ProductView.fromDomain(product);
    }

    @Override
    public ProductView createProduct(CreateProductCommand command) {
        if (productRepositoryPort.existsBySku(command.sku())) {
            throw new BusinessException("Product with SKU '" + command.sku() + "' already exists", HttpStatus.CONFLICT);
        }
        Product product = Product.create(
                command.name(),
                command.sku(),
                Money.of(command.price()),
                command.description(),
                command.status()
        );
        Product saved = productRepositoryPort.save(product);
        return ProductView.fromDomain(saved);
    }

    @Override
    public ProductView updateProduct(ProductId id, UpdateProductCommand command) {
        Product product = productRepositoryPort.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id.value()));

        Money money = command.price() != null ? Money.of(command.price()) : null;
        product.update(command.name(), money, command.description(), command.status());

        Product saved = productRepositoryPort.save(product);
        return ProductView.fromDomain(saved);
    }

    @Override
    public void deleteProduct(ProductId id) {
        Product product = productRepositoryPort.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id.value()));
        product.markDeleted();
        productRepositoryPort.save(product);
    }
}
