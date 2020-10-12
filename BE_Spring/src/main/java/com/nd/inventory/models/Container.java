package com.nd.inventory.models;

import lombok.Data;
import com.nd.inventory.models.AuditableModel;

import javax.persistence.*;

@Data
@Entity
@Table(name = "containers")
public class Container extends AuditableModel {

    @Column(name = "name")
    String name;
}
