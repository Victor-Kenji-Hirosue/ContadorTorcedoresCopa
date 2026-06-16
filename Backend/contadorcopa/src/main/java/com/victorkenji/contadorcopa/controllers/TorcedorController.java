package com.victorkenji.contadorcopa.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.victorkenji.contadorcopa.dtos.LoginDTO;
import com.victorkenji.contadorcopa.dtos.TorcedorRequest;
import com.victorkenji.contadorcopa.dtos.TorcedorResponse;
import com.victorkenji.contadorcopa.services.TorcedorService;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;





@RestController
@RequestMapping("/api/torcedores")
@CrossOrigin(origins = "http://localhost:4200")
public class TorcedorController{
    private final TorcedorService service;

    TorcedorController(TorcedorService service) {
        this.service = service;
    }

    @GetMapping
    public List<TorcedorResponse> getAll() {
        return service.findAll();
    }

    @PostMapping("/login")
public ResponseEntity<?> efetuarLogin(@RequestBody LoginDTO loginDto) {
    try {
        return ResponseEntity.ok(service.autenticar(loginDto));
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
}
    @PostMapping
   public ResponseEntity<TorcedorResponse> cadastrar(@RequestBody TorcedorRequest dto) {
    return ResponseEntity.ok(service.cadastrarNovoTorcedor(dto));
}
    
}
