package com.awesome.kit.dto.response;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record ProductResponse(
        Long id,
        String name,
        String sku,
        BigDecimal price,
        String description,
        String status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {}
