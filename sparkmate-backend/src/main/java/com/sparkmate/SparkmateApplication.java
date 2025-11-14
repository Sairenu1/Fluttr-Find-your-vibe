package com.sparkmate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SparkmateApplication {

    public static void main(String[] args) {
        SpringApplication.run(SparkmateApplication.class, args);
        System.out.println("\n" +
                "╔═══════════════════════════════════════════════════════╗\n" +
                "║   🚀 SparkMate Backend is Running Successfully!       ║\n" +
                "║                                                       ║\n" +
                "║   📍 URL: http://localhost:8080                      ║\n" +
                "║   🏥 Health: http://localhost:8080/api/auth/health   ║\n" +
                "║   📚 Swagger: http://localhost:8080/swagger-ui.html  ║\n" +
                "║                                                       ║\n" +
                "║   💕 Happy Matching!                                 ║\n" +
                "╚═══════════════════════════════════════════════════════╝\n");
    }
}
