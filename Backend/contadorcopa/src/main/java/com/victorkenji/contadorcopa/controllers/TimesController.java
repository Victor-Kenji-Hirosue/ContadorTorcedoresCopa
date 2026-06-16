package com.victorkenji.contadorcopa.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.victorkenji.contadorcopa.entities.Time;
import com.victorkenji.contadorcopa.repositories.TimeRepository;

import java.util.List;

@RestController
@RequestMapping("/api/times")
@CrossOrigin(origins = "http://localhost:4200")
public class TimesController {

    private final TimeRepository timeRepository;

    public TimesController(TimeRepository timeRepository) {
        this.timeRepository = timeRepository;
    }

    @GetMapping
    public List<Time> getAll() {
        return timeRepository.findAll();
    }
}
