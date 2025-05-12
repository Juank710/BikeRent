package BikeRent.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/*  ✅ Solo se permiten peticiones con JWT válidos.
    ✅ El sistema extrae los roles del token usando tu clase personalizada.
    ✅ No se guarda sesión ni estado del usuario.
    ✅ Puedes proteger métodos con @PreAuthorize(...) gracias a @EnableMethodSecurity.*/

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    /*Aqui se inyecta el convertidor personalizado de JWT*/
    @Autowired
    private JwtAuthenticationConverter jwtAuthenticationConverter;

    /*Le dice a SpringSecurity como manejar la seguridad HTTP*/
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                /*Desactiva la protección csrf, ya que el token no está en el navegador sino en el localStorage. Si se desactiva no se deben usar cookies de sesión*/
                .csrf(csrf -> csrf.disable())
                /*Toda petición HTTP que llegue debe ser autenticada con un JWT válido*/
                /*Tener en cuenta:
                .authorizeHttpRequests(auth -> auth
                .requestMatchers("/").permitAll()  // ← acceso libre
                .anyRequest().authenticated()      // el resto, protegido*/
                .authorizeHttpRequests(http -> http.anyRequest().authenticated())
                .oauth2ResourceServer(oauth -> {
                    oauth.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter));
                })
                /*Al usar SessionCreationPolicy.STATELESS:
                🔐 No se guarda ninguna sesión en el servidor.
                🪪 Toda la información del usuario está en el JWT, que debe enviarse con cada petición.
                🧠 Spring no almacena nada entre una petición y otra.
                ⚠️ No se usa HttpSession.*/
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

}
