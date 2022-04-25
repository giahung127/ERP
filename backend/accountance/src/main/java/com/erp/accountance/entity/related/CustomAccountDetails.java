package com.erp.accountance.entity.related;

import com.erp.accountance.entity.Account;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomAccountDetails implements UserDetails {
    Account account;

}
