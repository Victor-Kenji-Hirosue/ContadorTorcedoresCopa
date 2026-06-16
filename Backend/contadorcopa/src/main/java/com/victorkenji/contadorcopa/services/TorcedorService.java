package com.victorkenji.contadorcopa.services;

import java.util.List;

import org.springframework.stereotype.Service;

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

    public TorcedorResponse cadastrarNovoTorcedor(TorcedorRequest dto) {
        Time time = timeRepository.findById(dto.timeId())
                .orElseThrow(() -> new RuntimeException("Time não encontrado"));

        Torcedores novoTorcedor = TorcedorMapper.toEntity(dto, time);
        return TorcedorMapper.toDTO(repository.save(novoTorcedor));
    }


    public TorcedorResponse mudarDeTime(Long torcedorId, Long novoTimeId) {
        Torcedores t = repository.findById(torcedorId)
                .orElseThrow(() -> new RuntimeException("Torcedor não encontrado com o ID: " + torcedorId));

        Time novoTime = timeRepository.findById(novoTimeId)
                .orElseThrow(() -> new RuntimeException("Novo time não encontrado com o ID: " + novoTimeId));

        t.setTime(novoTime);

        Torcedores torcedorAtualizado = repository.save(t);

        return TorcedorMapper.toDTO(torcedorAtualizado);
    }
}
