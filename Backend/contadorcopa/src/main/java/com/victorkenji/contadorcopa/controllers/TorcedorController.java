package com.victorkenji.contadorcopa.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.victorkenji.contadorcopa.dtos.LoginDTO;
import com.victorkenji.contadorcopa.dtos.TorcedorRequest;
import com.victorkenji.contadorcopa.dtos.TorcedorResponse;
import com.victorkenji.contadorcopa.services.TorcedorService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/torcedores")
@CrossOrigin(origins = "http://localhost:4200")
public class TorcedorController{
    private final TorcedorService service;

    TorcedorController(TorcedorService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TorcedorResponse>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<TorcedorResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping("/login")
    public ResponseEntity<?> efetuarLogin(@RequestBody LoginDTO loginDto) {
        try {
            TorcedorResponse torcedorAutenticado = service.autenticar(loginDto);
            return ResponseEntity.ok(torcedorAutenticado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
       
        }
    }
    @PostMapping
    public ResponseEntity<TorcedorResponse> cadastrar(@RequestBody TorcedorRequest torcedor)
    {
        TorcedorResponse p = service.cadastrar(torcedor);
       
        URI location = ServletUriComponentsBuilder
                       .fromCurrentRequest()
                       .path("/{id}")
                       .buildAndExpand(p.id())
                       .toUri();
        
        return ResponseEntity.created(location).body(p);
    }

    @PutMapping("/{id}/mudar-time")
    public TorcedorResponse mudarTime(@PathVariable long id, @RequestBody Long novoTimeId) {
        return service.mudarDeTime(id, novoTimeId);

    }
    
    
}
