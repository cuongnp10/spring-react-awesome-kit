package com.awesome.kit.product.domain.ports.inbound;

import com.awesome.kit.product.application.dto.ProductView;
import com.awesome.kit.product.application.dto.UpdateProductCommand;
import com.awesome.kit.product.domain.model.ProductId;

public interface UpdateProductUseCase {
    ProductView updateProduct(ProductId id, UpdateProductCommand command);
}
