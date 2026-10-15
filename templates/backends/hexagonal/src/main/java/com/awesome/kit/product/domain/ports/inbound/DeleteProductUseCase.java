package com.awesome.kit.product.domain.ports.inbound;

import com.awesome.kit.product.domain.model.ProductId;

public interface DeleteProductUseCase {
    void deleteProduct(ProductId id);
}
