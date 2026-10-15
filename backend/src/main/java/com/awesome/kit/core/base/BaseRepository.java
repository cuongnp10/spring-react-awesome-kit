package com.awesome.kit.core.base;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity, ID>
        extends JpaRepository<T, ID>, JpaSpecificationExecutor<T> {

    Optional<T> findByIdAndIsDeletedFalse(ID id);

    Page<T> findAllByIsDeletedFalse(Pageable pageable);

    default Page<T> findAllActive(Specification<T> spec, Pageable pageable) {
        Specification<T> notDeletedSpec = (root, query, cb) -> cb.isFalse(root.get("isDeleted"));
        Specification<T> combinedSpec = spec == null ? notDeletedSpec : spec.and(notDeletedSpec);
        return findAll(combinedSpec, pageable);
    }
}
