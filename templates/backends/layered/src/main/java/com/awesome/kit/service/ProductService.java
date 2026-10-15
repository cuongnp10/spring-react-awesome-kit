package com.awesome.kit.service;

import com.awesome.kit.dto.request.ProductCreateRequest;
import com.awesome.kit.dto.request.ProductUpdateRequest;
import com.awesome.kit.dto.response.PageResponse;
import com.awesome.kit.dto.response.ProductResponse;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    PageResponse<ProductResponse> getProducts(Pageable pageable);

    ProductResponse getProductById(Long id);

    ProductResponse createProduct(ProductCreateRequest request);

    ProductResponse updateProduct(Long id, ProductUpdateRequest request);

    void deleteProduct(Long id);
}
