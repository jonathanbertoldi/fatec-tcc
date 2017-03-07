package com.tully.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Administrador extends Pessoa{

    @Column(unique = true, nullable = false)
    private String cpf;

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}
