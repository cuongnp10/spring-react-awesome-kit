package com.awesome.kit.product.application.dto;

import com.awesome.kit.product.domain.model.Product;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record ProductView(
        Long id,
        String name,
        String sku,
        BigDecimal price,
        String description,
        String status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
    public static ProductView fromDomain(Product product) {
        return new ProductView(
                product.getId() != null ? product.getId().value() : null,
                product.getName(),
                product.getSku(),
                product.getPrice() != null ? product.getPrice().amount() : null,
                product.getDescription(),
                product.getStatus(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }
}
