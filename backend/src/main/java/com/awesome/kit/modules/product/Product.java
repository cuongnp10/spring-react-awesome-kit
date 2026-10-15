package com.awesome.kit.modules.product;

import com.awesome.kit.core.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
class Product extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String status = "ACTIVE";

    public Product(String name, String sku, BigDecimal price, String description, String status) {
        this.name = name;
        this.sku = sku;
        this.price = price;
        this.description = description;
        this.status = status != null ? status : "ACTIVE";
    }
}
