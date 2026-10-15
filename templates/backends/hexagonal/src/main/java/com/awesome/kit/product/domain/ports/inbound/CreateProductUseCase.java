package com.awesome.kit.product.domain.ports.inbound;

import com.awesome.kit.product.application.dto.CreateProductCommand;
import com.awesome.kit.product.application.dto.ProductView;

public interface CreateProductUseCase {
    ProductView createProduct(CreateProductCommand command);
}
