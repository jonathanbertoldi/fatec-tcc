package com.tully.api.controller;

import com.tully.api.dao.AdministradorDAO;
import com.tully.api.model.Administrador;
import com.tully.api.model.Telefone;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
public class AdministradorRestController {

    private static final Logger logger = Logger.getLogger(AdministradorRestController.class);

    @Autowired
    private AdministradorDAO administradorDAO;

    @RequestMapping(value = "/administradores", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> listar() {
        List<Administrador> administradores = administradorDAO.encontrarTodos();
        return ResponseEntity.ok(Administrador.getListaJSONSimples(administradores).toString());
    }

    @RequestMapping(value = "/administradores/{administradorID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Administrador> encontrarPorId(@PathVariable long administradorID) {
        Administrador administrador = administradorDAO.encontrarPorId(administradorID);
        if (administrador == null)
            return new ResponseEntity<Administrador>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<Administrador>(administrador, HttpStatus.OK);
    }

    @RequestMapping(value = "/administradores", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Administrador> salvar(@RequestBody Administrador administrador) {
        try {
            administrador.setCriadoEm(LocalDate.now());
            for (Telefone telefone : administrador.getTelefones()) {
                telefone.setAdministrador(administrador);
            }
            administradorDAO.salvar(administrador);
            URI local = new URI("/administradores/" + administrador.getId());
            return ResponseEntity.created(local).body(administrador);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Administrador>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
