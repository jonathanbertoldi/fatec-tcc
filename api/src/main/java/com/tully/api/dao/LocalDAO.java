package com.tully.api.dao;


import com.tully.api.model.Local;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.util.List;

@Repository
public class LocalDAO implements DAO <Local> {


    @PersistenceContext
    private EntityManager manager;

    @Override
    @Transactional
    public void salvar(Local entidade) {
        manager.persist(entidade);
    }

    @Override
    @Transactional
    public void atualizar(Local entidade) {
        entidade.setAtualizado_em(LocalDate.now());
        manager.merge(entidade);
    }

    @Override
    public void deletar(Long id) {
        TypedQuery<Local> query = manager.createQuery("SELECT l FROM Local l WHERE l.id = :id", Local.class);
        query.setParameter("id", id);
        try{
            Local local = query.getSingleResult();
            local.setRemovido_em(LocalDate.now());
            manager.merge(local);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public List<Local> encontrarTodos() {
        TypedQuery<Local> query = manager.createQuery("SELECT l FROM Local l WHERE l.removido_em = NULL", Local.class);
        return query.getResultList();
    }

    @Override
    public Local encontrarPorId(Long id) {
        Local local = manager.find(Local.class, id);
        return local;
    }
}
