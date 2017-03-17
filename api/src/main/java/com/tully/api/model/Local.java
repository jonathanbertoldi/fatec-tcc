package com.tully.api.model;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import javax.persistence.Entity;

@Entity
public class Local {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String nome;

    @Column(nullable = false)
    private byte imagem;

    @Column(length = 20, nullable = false)
    private String latitude;

    @Column(length = 20, nullable = false)
    private String longitude;

    @Column(name = "criado_em", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate criado_em;

    @Column(name = "atualizado_em", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate atualizado_em;

    @Column(name = "removido_em", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate removido_em;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public byte getImagem() {
        return imagem;
    }

    public void setImagem(byte imagem) {
        this.imagem = imagem;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
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
