package com.victorkenji.contadorcopa.mappers;

import com.victorkenji.contadorcopa.dtos.TorcedorResponse;
import com.victorkenji.contadorcopa.dtos.TorcedorRequest;
import com.victorkenji.contadorcopa.entities.Time;
import com.victorkenji.contadorcopa.entities.Torcedores;

public class TorcedorMapper {
    public static Torcedores toEntity(TorcedorRequest request, Time time) {
        Torcedores t = new Torcedores();
        t.setEmail(request.email());
        t.setSenha(request.senha());
        t.setTime(time);
        return t;
        
    }

    public static TorcedorResponse toDTO(Torcedores torcedor) {
        String NomeDaSelecao = "";
        if (torcedor.getTime() != null) {
            NomeDaSelecao = torcedor.getTime().getName();
        }
        return new TorcedorResponse(
            torcedor.getId(),
            torcedor.getEmail(),
            NomeDaSelecao
        );
    }
}