package com.awesome.kit.product.infrastructure.persistence;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringDataProductRepository extends JpaRepository<ProductJpaEntity, Long>, JpaSpecificationExecutor<ProductJpaEntity> {

    Optional<ProductJpaEntity> findByIdAndIsDeletedFalse(Long id);

    boolean existsBySkuAndIsDeletedFalse(String sku);

    Page<ProductJpaEntity> findAllByIsDeletedFalse(Pageable pageable);
}
