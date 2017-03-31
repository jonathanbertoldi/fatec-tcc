package com.tully.api.controller;

import com.auth0.jwt.JWTSigner;
import com.tully.api.dao.AdministradorDAO;
import com.tully.api.model.Administrador;
import com.tully.api.model.Telefone;
import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

import static java.security.KeyRep.Type.SECRET;

@CrossOrigin
@RestController
public class AdministradorRestController {

    public static final String ISSUER = "tully.com";
    public static final String SECRET = "segredo";

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

    @RequestMapping(value = "/administradores/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> login(@RequestBody Administrador administrador) {
        try {
            // recebe um objeto administrador somente com login e senha
            // no momento que ele é instanciado a senha é criptografada
            // bate no banco de dados pra saber se o login e a senha criptografada estão corretas
            administrador = administradorDAO.login(administrador);
            if (administrador != null) {
                String jwt;
                JSONObject token = new JSONObject();
                JWTSigner signer = new JWTSigner(SECRET);
                long iat = System.currentTimeMillis() / 1000;
                long exp = iat + 120;

                HashMap<String, Object> claims = new HashMap<String, Object>();
                claims.put("iss", ISSUER);
                claims.put("iat", iat);
                claims.put("exp", exp);

                jwt = signer.sign(claims);
                token.put("token", jwt);
                return ResponseEntity.ok(token.toString());
            } else {
                return new ResponseEntity<String>(createJSONMessage("Combinação inválida de usuário/senha").toString(), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>(createJSONMessage("Erro na requisição enviada ao servidor").toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private JSONObject createJSONMessage(String message) {
        JSONObject r = new JSONObject();
        r.put("message", message);
        return r;
    }
}
