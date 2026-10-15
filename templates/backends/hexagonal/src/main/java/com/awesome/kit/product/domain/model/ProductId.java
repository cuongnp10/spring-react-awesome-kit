package com.awesome.kit.product.domain.model;

import java.io.Serializable;

public record ProductId(Long value) implements Serializable {
    public ProductId {
        if (value != null && value <= 0) {
            throw new IllegalArgumentException("Product ID must be greater than zero");
        }
    }

    public static ProductId of(Long value) {
        return new ProductId(value);
    }
}
