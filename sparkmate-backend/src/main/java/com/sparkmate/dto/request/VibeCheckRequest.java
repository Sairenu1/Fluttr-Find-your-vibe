package com.sparkmate.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VibeCheckRequest {
    private Integer vibeAdventurous;
    private Integer vibeIntellectual;
    private Integer vibeSocial;
    private Integer vibeCreative;
    private Integer vibeFitness;
}