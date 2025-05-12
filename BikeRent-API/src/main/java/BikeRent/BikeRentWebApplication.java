package BikeRent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*Esta es la clase principal*/
/*Actúa como punto de entrada del proyecto SpringBoot, con el método main que inicializa el contexto de Spring*/

@SpringBootApplication
public class BikeRentWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(BikeRentWebApplication.class, args);
	}

}
