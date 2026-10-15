package com.awesome.kit.modules.product;

import com.awesome.kit.core.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
interface ProductRepository extends BaseRepository<Product, Long> {

    boolean existsBySkuAndIsDeletedFalse(String sku);

    boolean existsBySkuAndIdNotAndIsDeletedFalse(String sku, Long id);
}
