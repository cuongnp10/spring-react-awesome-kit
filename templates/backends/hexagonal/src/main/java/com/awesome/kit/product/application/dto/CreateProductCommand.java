package com.awesome.kit.product.application.dto;

import java.math.BigDecimal;

public record CreateProductCommand(
        String name,
        String sku,
        BigDecimal price,
        String description,
        String status
) {}
