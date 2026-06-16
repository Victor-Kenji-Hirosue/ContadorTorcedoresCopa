package com.victorkenji.contadorcopa.dtos;

public record TorcedorRequest(
    String email,
    String senha,
    Long timeId
) {
}