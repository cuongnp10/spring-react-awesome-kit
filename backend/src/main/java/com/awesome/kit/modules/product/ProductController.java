package com.awesome.kit.modules.product;

import com.awesome.kit.core.base.BaseController;
import com.awesome.kit.core.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Product", description = "Sample CRUD vertical slice for Product entity")
public class ProductController extends BaseController<Product, ProductDto.Response, Long> {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        super(productService);
        this.productService = productService;
    }

    @PostMapping
    @Operation(summary = "Create a new product record")
    public ResponseEntity<ApiResponse<ProductDto.Response>> create(
            @Valid @RequestBody ProductDto.CreateRequest request
    ) {
        ProductDto.Response response = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.created(response));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing product record")
    public ResponseEntity<ApiResponse<ProductDto.Response>> update(
            @PathVariable Long id,
            @Valid @RequestBody ProductDto.UpdateRequest request
    ) {
        ProductDto.Response response = productService.update(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Resource updated successfully", response));
    }
}
