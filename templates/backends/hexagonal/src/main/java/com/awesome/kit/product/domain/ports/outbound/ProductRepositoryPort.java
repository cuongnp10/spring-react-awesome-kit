package com.awesome.kit.product.domain.ports.outbound;

import com.awesome.kit.product.domain.model.Product;
import com.awesome.kit.product.domain.model.ProductId;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepositoryPort {

    Optional<Product> findById(ProductId id);

    boolean existsBySku(String sku);

    Page<Product> findAll(Pageable pageable);

    Product save(Product product);
}
