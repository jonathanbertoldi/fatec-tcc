package com.tully.api.model;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.persistence.*;
import java.util.List;
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
    private List<Telefone> telefones;

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public List<Telefone> getTelefones() {
        return telefones;
    }

    public void setTelefones(List<Telefone> telefones) {
        this.telefones = telefones;
    }

    public static JSONArray getListaJSONSimples(List<Administrador> administradores) {
        JSONArray retorno = new JSONArray();
        for (Administrador administrador: administradores) {
            retorno.put(getJSONSimples(administrador));
        }
        return retorno;
    }

    public static JSONObject getJSONSimples(Administrador administrador) {
        JSONObject retorno = new JSONObject();
        retorno.put("id", administrador.getId());
        retorno.put("nome", administrador.getNome());
        retorno.put("cpf",administrador.getCpf());
        retorno.put("email",administrador.getEmail());
        retorno.put("login",administrador.getLogin());
        return retorno;
    }
}
