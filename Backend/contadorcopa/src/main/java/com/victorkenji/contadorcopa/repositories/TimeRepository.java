package com.victorkenji.contadorcopa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.victorkenji.contadorcopa.entities.Time;

public interface TimeRepository extends JpaRepository<Time, Long>{

}