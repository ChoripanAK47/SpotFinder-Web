package cl.spotfinder.spots.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class CorsConfig {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Aplica a todos los endpoints
                        .allowedOrigins(
                            "http://localhost*",          // Localhost (cualquier puerto)
                            "http://127.0.0.1*",          // Loopback (cualquier puerto)
                            "http://spotfinder.cl",       // Dominio custom
                            "http://www.spotfinder.cl",   // Dominio custom
                            "http://192.168.0.8*",        // TU IP LOCAL (LAN)
                            "https://*.ngrok-free.app",   // Soporte para Ngrok
                            "http://s3-tov-ikk-app-react.s3-website-us-east-1.amazonaws.com")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }

            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                // Expose local upload directory at /uploads/**
                String uploadPath = "file:" + System.getProperty("user.dir") + "/" + uploadDir + "/";
                registry.addResourceHandler("/uploads/**").addResourceLocations(uploadPath);
            }
        };
    }
}
