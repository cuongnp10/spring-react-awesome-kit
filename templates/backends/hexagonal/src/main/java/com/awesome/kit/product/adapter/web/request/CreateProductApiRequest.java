package com.awesome.kit.product.adapter.web.request;

import com.awesome.kit.product.application.dto.CreateProductCommand;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record CreateProductApiRequest(
        @NotBlank(message = "Product name is required")
        @Size(max = 255, message = "Product name must not exceed 255 characters")
        String name,

        @NotBlank(message = "Product SKU is required")
        @Size(max = 100, message = "Product SKU must not exceed 100 characters")
        String sku,

        @NotNull(message = "Product price is required")
        @DecimalMin(value = "0.0", inclusive = false, message = "Product price must be greater than zero")
        BigDecimal price,

        String description,

        String status
) {
    public CreateProductCommand toCommand() {
        return new CreateProductCommand(name, sku, price, description, status);
    }
}
