package com.awesome.kit.product.infrastructure.persistence;

import com.awesome.kit.product.domain.model.Money;
import com.awesome.kit.product.domain.model.Product;
import com.awesome.kit.product.domain.model.ProductId;
import org.springframework.stereotype.Component;

@Component
public class ProductPersistenceMapper {

    public Product toDomain(ProductJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        return new Product(
                entity.getId() != null ? ProductId.of(entity.getId()) : null,
                entity.getName(),
                entity.getSku(),
                entity.getPrice() != null ? Money.of(entity.getPrice()) : null,
                entity.getDescription(),
                entity.getStatus(),
                entity.isDeleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    public ProductJpaEntity toJpaEntity(Product domain) {
        if (domain == null) {
            return null;
        }
        ProductJpaEntity entity = new ProductJpaEntity();
        if (domain.getId() != null) {
            entity.setId(domain.getId().value());
        }
        entity.setName(domain.getName());
        entity.setSku(domain.getSku());
        entity.setPrice(domain.getPrice() != null ? domain.getPrice().amount() : null);
        entity.setDescription(domain.getDescription());
        entity.setStatus(domain.getStatus());
        entity.setDeleted(domain.isDeleted());
        entity.setCreatedAt(domain.getCreatedAt());
        entity.setUpdatedAt(domain.getUpdatedAt());
        return entity;
    }

    public void updateJpaEntity(Product domain, ProductJpaEntity entity) {
        if (domain == null || entity == null) {
            return;
        }
        entity.setName(domain.getName());
        entity.setPrice(domain.getPrice() != null ? domain.getPrice().amount() : null);
        entity.setDescription(domain.getDescription());
        entity.setStatus(domain.getStatus());
        entity.setDeleted(domain.isDeleted());
        entity.setUpdatedAt(domain.getUpdatedAt());
    }
}
