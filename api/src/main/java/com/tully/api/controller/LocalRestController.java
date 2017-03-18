package com.tully.api.controller;

import com.tully.api.dao.LocalDAO;
import com.tully.api.model.Local;
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
public class LocalRestController {

    @Autowired
    private LocalDAO localDAO;

    @RequestMapping(value = "/locais", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Local> salvar(@RequestBody Local local) {
        try {
            local.setCriado_em(LocalDate.now());
            localDAO.salvar(local);
            URI endereco = new URI("/locais/" + local.getId());
            return ResponseEntity.created(endereco).body(local);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Local>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/locais", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
        public List<Local> listar() {
            return localDAO.encontrarTodos();
        }

    @RequestMapping(value = "/locais/{localID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Local> encontrarPorId(@PathVariable long localID) {
        Local local = localDAO.encontrarPorId(localID);
        if (local == null)
            return new ResponseEntity<Local>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<Local>(local, HttpStatus.OK);
    }

    @RequestMapping(value = "/locais/{localID}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Local> atualizar(@PathVariable long localID, @RequestBody Local local) {
        try {
            Local localOLD = localDAO.encontrarPorId(localID);

            if (localOLD == null)
                return new ResponseEntity<Local>(HttpStatus.NOT_FOUND);

            localDAO.atualizar(local);

            HttpHeaders responseHeader = new HttpHeaders();
            URI endereco = new URI("/desafios/" + local.getId());
            responseHeader.setLocation(endereco);

            return new ResponseEntity<Local>(responseHeader, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Local>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/locais/{localID}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> destruir(@PathVariable long localID) {
        localDAO.deletar(localID);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}

