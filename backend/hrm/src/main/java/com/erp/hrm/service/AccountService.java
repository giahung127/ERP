package com.erp.hrm.service;

import com.erp.hrm.controller.request.ChangePasswordReq;
import com.erp.hrm.controller.request.LoginReq;
import com.erp.hrm.controller.response.GetAccountByIdRes;
import com.erp.hrm.controller.response.GetEmployeeByIdRes;
import com.erp.hrm.controller.response.LoginRes;
import com.erp.hrm.controller.response.NormalRes;
import com.erp.hrm.entity.Account;
import com.erp.hrm.entity.Employee;
import com.erp.hrm.entity.related.AccountStatus;
import com.erp.hrm.repository.AccountRepository;
import com.erp.hrm.repository.EmployeeRepository;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private AccountRepository accountRepository;

    public NormalRes changePassword(ChangePasswordReq req) throws Error {
        String password = Hashing.sha256()
                .hashString(req.password, StandardCharsets.UTF_8)
                .toString();
        if (!accountRepository.existsAccountByUsernameAndPassword(req.username, password)){
            return new NormalRes("400", "Wrong password", "");
        }
        String newPassword = Hashing.sha256()
                .hashString(req.newPassword, StandardCharsets.UTF_8)
                .toString();
        Optional<Account> account = accountRepository.findAccountByUsernameAndPassword(req.username, password);
        account.get().setPassword(newPassword);
        account.get().setAccountStatus(AccountStatus.ACTIVATE);
        accountRepository.save(account.get());
        return new NormalRes("200", "Successfully update account password", "");
    }

    public List<Account> loadAll() throws Error {
        return accountRepository.findAll();
    }

    public NormalRes deactivate(String accountId) throws Error {
        Optional<Account> account =  accountRepository.findById(UUID.fromString(accountId));
        account.get().setAccountStatus(AccountStatus.DEACTIVATE);
        accountRepository.save(account.get());
        return new NormalRes("200", "Deactivate account successfully", "");
    }

    public NormalRes activate(String accountId) throws Error {
        Optional<Account> account =  accountRepository.findById(UUID.fromString(accountId));
        account.get().setAccountStatus(AccountStatus.ACTIVATE);
        accountRepository.save(account.get());
        return new NormalRes("200", "Activate account successfully", "");
    }


    public LoginRes loginAccount(LoginReq loginInfo) throws Error{
        Optional<Account> result = accountRepository.findByUsername(loginInfo.username);
        if (result.isEmpty()){
            return new LoginRes("404", "User name does not exist", null);
        }
        else if (result.get().getAccountStatus() == AccountStatus.DEACTIVATE){
            return new LoginRes("404", "This account is deactivated", null);
        }
        else if (Objects.equals(result.get().getPassword(), Hashing.sha256().hashString(loginInfo.password, StandardCharsets.UTF_8).toString())){
            return new LoginRes("200", "Success", result.get());
        }
        return new LoginRes("404", "Wrong password", null);
    }

    public GetAccountByIdRes getAccountById(String accountId) throws Error {
        Optional<Account> result = accountRepository.findById(UUID.fromString(accountId));
        Optional<Employee> employee = employeeRepository.findById(UUID.fromString(result.get().getEmployeeId()));
        result.get().setEmployeeName(employee.get().getName());
        assert(result.isEmpty());
        return new GetAccountByIdRes("200", "Found Supplier Record", result.get());
    }
}
