package com.tully.api.controller;

import com.tully.api.dao.AdministradorDAO;
import com.tully.api.model.Administrador;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class AdministradorRestController {

    private static final Logger logger = Logger.getLogger(AdministradorRestController.class);

    @Autowired
    private AdministradorDAO administradorDAO;

    @RequestMapping(value = "/administradores", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Administrador> salvar(@RequestBody Administrador administrador) {
        try {
            return ResponseEntity.ok(administrador);
        } catch (Exception e) {
            logger.error(e);
            return new ResponseEntity<Administrador>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
