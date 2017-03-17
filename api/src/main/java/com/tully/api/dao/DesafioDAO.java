package com.tully.api.dao;


import com.tully.api.model.Desafio;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.util.List;

public class DesafioDAO implements DAO<Desafio> {

    @PersistenceContext
    private EntityManager manager;


    @Override
    @Transactional
    public void salvar(Desafio entidade) {
        manager.persist(entidade);
    }

    @Override
    @Transactional
    public void atualizar(Desafio entidade) {
        entidade.setAtualizado_em(LocalDate.now());
        manager.merge(entidade);
    }


    @Override
    @Transactional
    public void deletar(Long id) {
        TypedQuery<Desafio> query = manager.createQuery("SELECT d FROM Desafio d WHERE d.id_desafio = :id", Desafio.class);
        query.setParameter("id", id);
        try{
            Desafio desafio = query.getSingleResult();
            desafio.setRemovido_em(LocalDate.now());
            manager.merge(desafio);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public List<Desafio> encontrarTodos() {
        TypedQuery<Desafio> query = manager.createQuery("SELECT d FROM Desafio d WHERE d.removido_em = NULL", Desafio.class);
        return query.getResultList();
    }

    @Override
    public Desafio encontrarPorId(Long id) {
        Desafio desafio = manager.find(Desafio.class, id);
        return desafio;
    }
}
