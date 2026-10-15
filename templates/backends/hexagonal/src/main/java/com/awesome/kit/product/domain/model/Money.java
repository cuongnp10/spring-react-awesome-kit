package com.awesome.kit.product.domain.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;

public record Money(BigDecimal amount) implements Serializable {
    public Money {
        if (amount == null) {
            throw new IllegalArgumentException("Amount cannot be null");
        }
        if (amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }
        amount = amount.setScale(2, RoundingMode.HALF_UP);
    }

    public static Money of(BigDecimal amount) {
        return new Money(amount);
    }
}
