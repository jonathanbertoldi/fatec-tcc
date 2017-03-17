package com.tully.api.dao;


import com.tully.api.model.Administrador;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.util.List;

@Repository
public class AdministradorDAO implements DAO<Administrador> {


    @PersistenceContext
    private EntityManager manager;

    @Transactional
    public void salvar(Administrador entidade) {
        manager.persist(entidade);
    }

    @Transactional
    public void atualizar(Administrador entidade) {
        entidade.setAtualizadoEm(LocalDate.now());
        manager.merge(entidade);
    }

    @Transactional
    public void deletar(Long id) {
        TypedQuery<Administrador> query = manager.createQuery("SELECT a FROM Administrador a WHERE a.id = :id", Administrador.class);
        query.setParameter("id", id);
        try{
            Administrador administrador = query.getSingleResult();
            administrador.setRemovidoEm(LocalDate.now());
            manager.merge(administrador);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public List<Administrador> encontrarTodos() {
        TypedQuery<Administrador> query = manager.createQuery("SELECT a FROM Administrador a WHERE a.removidoEm = NULL", Administrador.class);
        return query.getResultList();
    }

    public Administrador encontrarPorId(Long id) {
        Administrador administrador = manager.find(Administrador.class, id);
        return administrador;
    }

    public Administrador login(Administrador administrador) {
        TypedQuery<Administrador> query = manager.createQuery("SELECT a FROM Administrador a WHERE a.login = :login AND a.senha = :senha", Administrador.class);
        query.setParameter("login", administrador.getLogin());
        query.setParameter("senha", administrador.getSenha());
        try {
            return query.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }


}
