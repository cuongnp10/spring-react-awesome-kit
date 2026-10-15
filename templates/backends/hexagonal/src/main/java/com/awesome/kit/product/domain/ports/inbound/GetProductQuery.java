package com.awesome.kit.product.domain.ports.inbound;

import com.awesome.kit.product.adapter.web.response.PageResponse;
import com.awesome.kit.product.application.dto.ProductView;
import com.awesome.kit.product.domain.model.ProductId;
import org.springframework.data.domain.Pageable;

public interface GetProductQuery {
    PageResponse<ProductView> getProducts(Pageable pageable);
    ProductView getProductById(ProductId id);
}
