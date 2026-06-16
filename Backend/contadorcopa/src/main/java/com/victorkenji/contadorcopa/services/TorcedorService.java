package com.victorkenji.contadorcopa.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.victorkenji.contadorcopa.dtos.LoginDTO;
import com.victorkenji.contadorcopa.dtos.TorcedorRequest;
import com.victorkenji.contadorcopa.dtos.TorcedorResponse;
import com.victorkenji.contadorcopa.entities.Time;
import com.victorkenji.contadorcopa.entities.Torcedores;
import com.victorkenji.contadorcopa.mappers.TorcedorMapper;
import com.victorkenji.contadorcopa.repositories.TimeRepository;
import com.victorkenji.contadorcopa.repositories.TorcedorRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TorcedorService{

    private final TorcedorRepository repository;

    private final TimeRepository timeRepository;

    TorcedorService(TorcedorRepository repository, TimeRepository timeRepository) {
        this.repository = repository;
        this.timeRepository = timeRepository;
    }

    public TorcedorResponse autenticar(LoginDTO loginDto) {
        Torcedores t = repository.findByEmail(loginDto.email())
                .orElseThrow(() -> new RuntimeException("E-mail ou senha incorretos."));

        if (!t.getSenha().equals(loginDto.senha())) {
            throw new RuntimeException("E-mail ou senha incorretos.");
        }

        return TorcedorMapper.toDTO(t);

    }
    

    public List<TorcedorResponse> findAll(){
        return repository.findAll()
                        .stream()
                        .map(TorcedorMapper::toDTO)
                        .toList();
    }

    public TorcedorResponse findById(Long id){
        return repository.findById(id).map(TorcedorMapper::toDTO).orElseThrow(() -> new EntityNotFoundException("Torcedor não cadastro"));
    }

        public boolean emailJaExiste(String email) {
        return repository.existsByEmail(email);
        }

        public TorcedorResponse cadastrarNovoTorcedor(TorcedorRequest dto) {
        if (repository.existsByEmail(dto.email())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email já cadastrado");
        }

        Time time = timeRepository.findById(dto.timeId())
                .orElseThrow(() -> new RuntimeException("Time não encontrado"));

        Torcedores novoTorcedor = TorcedorMapper.toEntity(dto, time);

        return TorcedorMapper.toDTO(repository.save(novoTorcedor));
    }

}
