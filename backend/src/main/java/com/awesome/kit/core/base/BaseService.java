package com.awesome.kit.core.base;

import com.awesome.kit.core.exception.ResourceNotFoundException;
import com.awesome.kit.core.response.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

public abstract class BaseService<T extends BaseEntity, RES, ID> {

    protected final BaseRepository<T, ID> repository;
    protected final String resourceName;

    protected BaseService(BaseRepository<T, ID> repository, String resourceName) {
        this.repository = repository;
        this.resourceName = resourceName;
    }

    @Transactional(readOnly = true)
    public PageResponse<RES> findAll(Specification<T> spec, Pageable pageable) {
        Page<T> page = repository.findAllActive(spec, pageable);
        return PageResponse.from(page, this::toResponse);
    }

    @Transactional(readOnly = true)
    public RES findById(ID id) {
        T entity = getEntityById(id);
        return toResponse(entity);
    }

    @Transactional(readOnly = true)
    public T getEntityById(ID id) {
        return repository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException(resourceName, id));
    }

    @Transactional
    public void delete(ID id) {
        T entity = getEntityById(id);
        entity.setDeleted(true);
        repository.save(entity);
    }

    public abstract RES toResponse(T entity);
}
