package com.awesome.kit.product.adapter.web;

import com.awesome.kit.product.adapter.web.request.CreateProductApiRequest;
import com.awesome.kit.product.adapter.web.request.UpdateProductApiRequest;
import com.awesome.kit.product.adapter.web.response.ApiResponse;
import com.awesome.kit.product.adapter.web.response.PageResponse;
import com.awesome.kit.product.adapter.web.response.ProductApiResponse;
import com.awesome.kit.product.application.dto.ProductView;
import com.awesome.kit.product.domain.model.ProductId;
import com.awesome.kit.product.domain.ports.inbound.CreateProductUseCase;
import com.awesome.kit.product.domain.ports.inbound.DeleteProductUseCase;
import com.awesome.kit.product.domain.ports.inbound.GetProductQuery;
import com.awesome.kit.product.domain.ports.inbound.UpdateProductUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Product", description = "Product management endpoints (Hexagonal Architecture)")
public class ProductRestController {

    private final CreateProductUseCase createProductUseCase;
    private final GetProductQuery getProductQuery;
    private final UpdateProductUseCase updateProductUseCase;
    private final DeleteProductUseCase deleteProductUseCase;

    public ProductRestController(
            CreateProductUseCase createProductUseCase,
            GetProductQuery getProductQuery,
            UpdateProductUseCase updateProductUseCase,
            DeleteProductUseCase deleteProductUseCase
    ) {
        this.createProductUseCase = createProductUseCase;
        this.getProductQuery = getProductQuery;
        this.updateProductUseCase = updateProductUseCase;
        this.deleteProductUseCase = deleteProductUseCase;
    }

    @GetMapping
    @Operation(summary = "Get paginated list of products")
    public ResponseEntity<ApiResponse<PageResponse<ProductApiResponse>>> getProducts(
            @PageableDefault(size = 20) Pageable pageable
    ) {
        PageResponse<ProductView> views = getProductQuery.getProducts(pageable);
        ListProductMapper listMapper = new ListProductMapper(views);
        return ResponseEntity.ok(ApiResponse.ok(listMapper.toApiResponsePage()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ApiResponse<ProductApiResponse>> getProductById(@PathVariable Long id) {
        ProductView view = getProductQuery.getProductById(ProductId.of(id));
        return ResponseEntity.ok(ApiResponse.ok(ProductApiResponse.fromView(view)));
    }

    @PostMapping
    @Operation(summary = "Create a new product")
    public ResponseEntity<ApiResponse<ProductApiResponse>> createProduct(
            @Valid @RequestBody CreateProductApiRequest request
    ) {
        ProductView view = createProductUseCase.createProduct(request.toCommand());
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.created(ProductApiResponse.fromView(view)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing product")
    public ResponseEntity<ApiResponse<ProductApiResponse>> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProductApiRequest request
    ) {
        ProductView view = updateProductUseCase.updateProduct(ProductId.of(id), request.toCommand());
        return ResponseEntity.ok(ApiResponse.ok("Product updated successfully", ProductApiResponse.fromView(view)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete a product by ID")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        deleteProductUseCase.deleteProduct(ProductId.of(id));
        return ResponseEntity.ok(ApiResponse.ok("Product deleted successfully", null));
    }

    private static class ListProductMapper {
        private final PageResponse<ProductView> views;

        public ListProductMapper(PageResponse<ProductView> views) {
            this.views = views;
        }

        public PageResponse<ProductApiResponse> toApiResponsePage() {
            var items = views.items().stream().map(ProductApiResponse::fromView).toList();
            return new PageResponse<>(
                    items,
                    views.page(),
                    views.size(),
                    views.totalElements(),
                    views.totalPages(),
                    views.isFirst(),
                    views.isLast()
            );
        }
    }
}
