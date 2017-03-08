package com.tully.api.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Administrador extends Pessoa{

    @Column(unique = true, nullable = false)
    private String cpf;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_id", nullable = false, foreignKey = @ForeignKey(name = "fk_administrador_endereco"))
    private Endereco endereco;

    //Relacionamentos * to Many precisam ser mapeados
    @OneToMany(mappedBy = "administrador", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Telefone> telefones;

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}
