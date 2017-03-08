package com.tully.api.dao;


import java.util.List;

public interface DAO<T> {
    // o T se transforma no que for expecificada na hora de implementar a interface
    void salvar(T entidade);

    void atualizar(T entidade);

    void deletar(Long id);

    List<T> encontrarTodos();

    T encontrarPorId(Long id);
}
