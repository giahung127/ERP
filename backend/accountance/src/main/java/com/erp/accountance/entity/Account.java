package com.erp.accountance.entity;

import com.erp.accountance.controller.request.NewAccountReq;
import com.erp.accountance.entity.related.Role;
import com.google.common.hash.Hashing;
import jdk.jfr.DataAmount;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID id;
    @Column(unique=true, nullable = false)
    private String username;
    private String password;
    private String employeeId;
    public Account(NewAccountReq req){
        this.username = req.username;
        this.password = Hashing.sha256()
                .hashString(req.password, StandardCharsets.UTF_8)
                .toString();
        this.employeeId = req.employee_id;
    }
}
