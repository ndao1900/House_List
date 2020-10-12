package com.nd.inventory.models;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
public class AuditableModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private Date createDate;

    private Date updateDate;

    @PrePersist
    void onCreate() {
        this.setCreateDate(new Date());
        this.setUpdateDate(new Date());
    }

    @PreUpdate
    void onUpdate() {
        this.setUpdateDate(new Date());
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}
