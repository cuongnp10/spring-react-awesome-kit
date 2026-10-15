package com.awesome.kit.product.domain.model;

import com.awesome.kit.product.domain.exception.ProductDomainException;
import java.time.OffsetDateTime;

public class Product {

    private ProductId id;
    private String name;
    private String sku;
    private Money price;
    private String description;
    private String status;
    private boolean isDeleted;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public Product(ProductId id, String name, String sku, Money price, String description, String status, boolean isDeleted, OffsetDateTime createdAt, OffsetDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.sku = sku;
        this.price = price;
        this.description = description;
        this.status = status != null ? status : "ACTIVE";
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Product create(String name, String sku, Money price, String description, String status) {
        if (name == null || name.isBlank()) {
            throw new ProductDomainException("Product name cannot be empty");
        }
        if (sku == null || sku.isBlank()) {
            throw new ProductDomainException("Product SKU cannot be empty");
        }
        return new Product(null, name, sku, price, description, status != null ? status : "ACTIVE", false, OffsetDateTime.now(), null);
    }

    public void update(String name, Money price, String description, String status) {
        if (name != null && !name.isBlank()) {
            this.name = name;
        }
        if (price != null) {
            this.price = price;
        }
        if (description != null) {
            this.description = description;
        }
        if (status != null && !status.isBlank()) {
            this.status = status;
        }
        this.updatedAt = OffsetDateTime.now();
    }

    public void markDeleted() {
        this.isDeleted = true;
        this.updatedAt = OffsetDateTime.now();
    }

    public ProductId getId() {
        return id;
    }

    public void setId(ProductId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getSku() {
        return sku;
    }

    public Money getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }
}
