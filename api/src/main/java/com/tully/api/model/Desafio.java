package com.tully.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Desafio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_desafio;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "local_id", nullable = false, foreignKey = @ForeignKey(name = "fk_desafio_local"))
    private Local local;

    @Column(length = 100, nullable = false)
    private String nome;

    @Column(length = 255, nullable = false)
    private String descricao;

    @Column(nullable = false)
    private Long pontuacao;

    @Column(nullable = false)
    private byte imagem;

    @Column(name = "criado_em", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate criado_em;

    @Column(name = "atualizado_em", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate atualizado_em;

    @Column(name = "removido_em", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate removido_em;


    public Long getId_desafio() {
        return id_desafio;
    }

    public void setId_desafio(Long id_desafio) {
        this.id_desafio = id_desafio;
    }

    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getPontuacao() {
        return pontuacao;
    }

    public void setPontuacao(Long pontuacao) {
        this.pontuacao = pontuacao;
    }

    public byte getImagem() {
        return imagem;
    }

    public void setImagem(byte imagem) {
        this.imagem = imagem;
    }

    public LocalDate getCriado_em() {
        return criado_em;
    }

    public void setCriado_em(LocalDate criado_em) {
        this.criado_em = criado_em;
    }

    public LocalDate getAtualizado_em() {
        return atualizado_em;
    }

    public void setAtualizado_em(LocalDate atualizado_em) {
        this.atualizado_em = atualizado_em;
    }

    public LocalDate getRemovido_em() {
        return removido_em;
    }

    public void setRemovido_em(LocalDate removido_em) {
        this.removido_em = removido_em;
    }
}
