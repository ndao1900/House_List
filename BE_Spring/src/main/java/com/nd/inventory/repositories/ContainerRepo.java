package com.nd.inventory.repositories;

import com.nd.inventory.models.Container;
import io.swagger.annotations.Api;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Api(tags = "Container Entity")
@RepositoryRestResource
public interface ContainerRepo extends JpaRepository<Container,Long> {

}
