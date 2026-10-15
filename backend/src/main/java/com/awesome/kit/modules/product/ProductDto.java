package com.awesome.kit.modules.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.Instant;

public final class ProductDto {

    private ProductDto() {}

    public record CreateRequest(
            @NotBlank(message = "Product name is required")
            @Size(max = 255, message = "Product name cannot exceed 255 characters")
            String name,

            @NotBlank(message = "SKU code is required")
            @Size(max = 100, message = "SKU cannot exceed 100 characters")
            String sku,

            @NotNull(message = "Price is required")
            @Positive(message = "Price must be strictly positive")
            BigDecimal price,

            String description,

            String status
    ) {}

    public record UpdateRequest(
            @NotBlank(message = "Product name is required")
            @Size(max = 255, message = "Product name cannot exceed 255 characters")
            String name,

            @NotNull(message = "Price is required")
            @Positive(message = "Price must be strictly positive")
            BigDecimal price,

            String description,

            String status
    ) {}

    public record Response(
            Long id,
            String name,
            String sku,
            BigDecimal price,
            String description,
            String status,
            Instant createdAt,
            Instant updatedAt
    ) {}
}
