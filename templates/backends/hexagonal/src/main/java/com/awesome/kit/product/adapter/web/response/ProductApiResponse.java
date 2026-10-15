package com.awesome.kit.product.adapter.web.response;

import com.awesome.kit.product.application.dto.ProductView;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record ProductApiResponse(
        Long id,
        String name,
        String sku,
        BigDecimal price,
        String description,
        String status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
    public static ProductApiResponse fromView(ProductView view) {
        return new ProductApiResponse(
                view.id(),
                view.name(),
                view.sku(),
                view.price(),
                view.description(),
                view.status(),
                view.createdAt(),
                view.updatedAt()
        );
    }
}
