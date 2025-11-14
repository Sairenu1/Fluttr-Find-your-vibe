package com.sparkmate.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequest {
    private Long matchId;
    private String content;
}
