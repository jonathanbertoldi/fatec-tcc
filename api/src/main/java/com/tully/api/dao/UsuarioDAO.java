package com.tully.api.dao;


import com.tully.api.model.Usuario;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.util.List;

@Repository
public class UsuarioDAO implements DAO<Usuario>{

    @PersistenceContext
    private EntityManager manager;

    @Transactional
    @Override
    public void salvar(Usuario entidade) {
        manager.persist(entidade);
    }

    @Transactional
    @Override
    public void atualizar(Usuario entidade) {
        entidade.setAtualizadoEm(LocalDate.now());
        manager.merge(entidade);
    }

    @Transactional
    @Override
    public void deletar(Long id) {
        TypedQuery<Usuario> query = manager.createQuery("SELECT u FROM Usuario u WHERE u.id = :id", Usuario.class);
        query.setParameter("id", id);
        try{
            Usuario usuario = query.getSingleResult();
            usuario.setRemovidoEm(LocalDate.now());
            manager.merge(usuario);
        } catch (Exception e){
            throw e;
        }
    }

    @Override
    public List<Usuario> encontrarTodos() {
        TypedQuery<Usuario> query = manager.createQuery("SELECT u FROM Usuario u WHERE u.removidoEm = NULL", Usuario.class);
        return query.getResultList();
    }

    @Override
    public Usuario encontrarPorId(Long id) {
        Usuario usuario = manager.find(Usuario.class, id);
        return usuario;
    }
}
