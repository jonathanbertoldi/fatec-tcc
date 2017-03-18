package com.tully.api.controller;

import com.tully.api.dao.DesafioDAO;
import com.tully.api.model.Desafio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
public class DesafioRestController {

    @Autowired
    private DesafioDAO desafioDAO;

    @RequestMapping(value = "/desafios", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Desafio> salvar(@RequestBody Desafio desafio) {
        try {
            desafio.setCriado_em(LocalDate.now());
            desafioDAO.salvar(desafio);
            URI local = new URI("/desafios/" + desafio.getId_desafio());
            return ResponseEntity.created(local).body(desafio);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Desafio>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/desafios", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> listar() {
        List<Desafio> desafios = desafioDAO.encontrarTodos();
        return ResponseEntity.ok(Desafio.getListaJSONSimples(desafios).toString());
    }

    @RequestMapping(value = "/desafios/{desafioID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Desafio> encontrarPorId(@PathVariable long desafioID) {
        Desafio desafio = desafioDAO.encontrarPorId(desafioID);
        if (desafio == null)
            return new ResponseEntity<Desafio>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<Desafio>(desafio, HttpStatus.OK);
    }

    @RequestMapping(value = "/desafios/{desafioID}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Desafio> atualizar(@PathVariable long desafioID, @RequestBody Desafio desafio) {
        try {
            Desafio desafioOLD = desafioDAO.encontrarPorId(desafioID);

            if (desafioOLD == null)
                return new ResponseEntity<Desafio>(HttpStatus.NOT_FOUND);

            desafioDAO.atualizar(desafio);

            HttpHeaders responseHeader = new HttpHeaders();
            URI local = new URI("/desafios/" + desafio.getId_desafio());
            responseHeader.setLocation(local);

            return new ResponseEntity<Desafio>(responseHeader, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Desafio>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/desafios/{desafioID}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> destruir(@PathVariable long desafioID) {
        desafioDAO.deletar(desafioID);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

}
