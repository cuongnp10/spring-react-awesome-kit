package com.awesome.kit.product.adapter.web.request;

import com.awesome.kit.product.application.dto.UpdateProductCommand;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record UpdateProductApiRequest(
        @Size(max = 255, message = "Product name must not exceed 255 characters")
        String name,

        @DecimalMin(value = "0.0", inclusive = false, message = "Product price must be greater than zero")
        BigDecimal price,

        String description,

        String status
) {
    public UpdateProductCommand toCommand() {
        return new UpdateProductCommand(name, price, description, status);
    }
}
