package com.awesome.kit.mapper;

import com.awesome.kit.dto.request.ProductCreateRequest;
import com.awesome.kit.dto.request.ProductUpdateRequest;
import com.awesome.kit.dto.response.ProductResponse;
import com.awesome.kit.entity.Product;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity(ProductCreateRequest request);

    ProductResponse toResponse(Product entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(ProductUpdateRequest request, @MappingTarget Product entity);
}
