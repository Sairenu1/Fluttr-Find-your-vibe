package com.sparkmate.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SwipeRequest {
    private Long targetUserId;
    private String swipeType;
}