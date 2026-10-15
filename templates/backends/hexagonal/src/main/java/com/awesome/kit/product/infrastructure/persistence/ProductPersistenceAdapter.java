package com.awesome.kit.product.infrastructure.persistence;

import com.awesome.kit.product.domain.model.Product;
import com.awesome.kit.product.domain.model.ProductId;
import com.awesome.kit.product.domain.ports.outbound.ProductRepositoryPort;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public class ProductPersistenceAdapter implements ProductRepositoryPort {

    private final SpringDataProductRepository repository;
    private final ProductPersistenceMapper mapper;

    public ProductPersistenceAdapter(SpringDataProductRepository repository, ProductPersistenceMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public Optional<Product> findById(ProductId id) {
        return repository.findByIdAndIsDeletedFalse(id.value())
                .map(mapper::toDomain);
    }

    @Override
    public boolean existsBySku(String sku) {
        return repository.existsBySkuAndIsDeletedFalse(sku);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        Page<ProductJpaEntity> entityPage = repository.findAllByIsDeletedFalse(pageable);
        return entityPage.map(mapper::toDomain);
    }

    @Override
    public Product save(Product domainProduct) {
        ProductJpaEntity entity;
        if (domainProduct.getId() != null) {
            entity = repository.findById(domainProduct.getId().value())
                    .orElseGet(() -> mapper.toJpaEntity(domainProduct));
            mapper.updateJpaEntity(domainProduct, entity);
        } else {
            entity = mapper.toJpaEntity(domainProduct);
        }
        ProductJpaEntity savedEntity = repository.save(entity);
        return mapper.toDomain(savedEntity);
    }
}
