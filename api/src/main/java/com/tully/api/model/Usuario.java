package com.tully.api.model;


import javax.persistence.*;
import javax.persistence.Entity;

@Entity
public class Usuario extends Pessoa{

    @Column(nullable = false)
    private Long experiencia;

    @Column(nullable = false)
    private Long nivel;

    @Column
    private boolean vip;

    @Column(length = 30, nullable = false)
    private String estado;

    @Column(length = 30, nullable = false)
    private String pais;

    public Long getExperiencia() {
        return experiencia;
    }

    public void setExperiencia(Long experiencia) {
        this.experiencia = experiencia;
    }

    public Long getNivel() {
        return nivel;
    }

    public void setNivel(Long nivel) {
        this.nivel = nivel;
    }

    public boolean isVip() {
        return vip;
    }

    public void setVip(boolean vip) {
        this.vip = vip;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }
}
