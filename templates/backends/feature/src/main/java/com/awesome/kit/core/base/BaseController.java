package com.awesome.kit.core.base;

import com.awesome.kit.core.response.ApiResponse;
import com.awesome.kit.core.response.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public abstract class BaseController<T extends BaseEntity, RES, ID> {

    protected final BaseService<T, RES, ID> service;

    protected BaseController(BaseService<T, RES, ID> service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Get paginated list of active records")
    public ResponseEntity<ApiResponse<PageResponse<RES>>> getAll(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        PageResponse<RES> page = service.findAll(null, pageable);
        return ResponseEntity.ok(ApiResponse.ok(page));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get single record by identifier")
    public ResponseEntity<ApiResponse<RES>> getById(@PathVariable ID id) {
        RES response = service.findById(id);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete record by identifier")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable ID id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Resource deleted successfully", null));
    }
}
