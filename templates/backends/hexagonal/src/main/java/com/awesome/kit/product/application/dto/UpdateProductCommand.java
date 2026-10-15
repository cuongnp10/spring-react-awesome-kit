package com.awesome.kit.product.application.dto;

import java.math.BigDecimal;

public record UpdateProductCommand(
        String name,
        BigDecimal price,
        String description,
        String status
) {}
