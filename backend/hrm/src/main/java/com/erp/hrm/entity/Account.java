package com.erp.hrm.entity;

import com.erp.hrm.entity.related.AccountStatus;
import com.google.common.hash.Hashing;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID id;
    @Column(unique=true, nullable = false)
    private String username;
    private String password;
    private AccountStatus accountStatus;
    private String employeeId;
    public Account(String username, String password, String employee_id){
        this.username = username;
        this.password = Hashing.sha256()
                .hashString(password, StandardCharsets.UTF_8)
                .toString();
        this.employeeId = employee_id;
        this.accountStatus = AccountStatus.PENDING;
    }
}
