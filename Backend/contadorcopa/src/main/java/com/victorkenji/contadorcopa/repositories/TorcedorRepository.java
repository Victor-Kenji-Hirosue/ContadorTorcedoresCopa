package com.victorkenji.contadorcopa.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.victorkenji.contadorcopa.entities.Torcedores;

public interface TorcedorRepository extends JpaRepository<Torcedores, Long>{

    Optional<Torcedores> findByEmail(String email);
}