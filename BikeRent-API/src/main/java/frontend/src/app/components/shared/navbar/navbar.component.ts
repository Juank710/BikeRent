import { KeycloakService } from './../../../services/keycloak/keycloak.service';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private keycloakService: KeycloakService){}

  async logout() {
    await this.keycloakService.logout();
  }

}
