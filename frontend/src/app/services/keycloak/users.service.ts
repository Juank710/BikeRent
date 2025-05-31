import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

export interface KeycloakUser {
    id?: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/keycloak/users/search';

    constructor(
        private httpClient: HttpClient,
        private oauthService: OAuthService
    ) {}

    getUsers(): Observable<KeycloakUser[]> {
        return this.httpClient.get<KeycloakUser[]>(this.apiUrl, {
            headers: {
                Authorization: `Bearer ${this.oauthService.getAccessToken()}`
            }
        });
    }

    createUser(user: KeycloakUser): Observable<string> {
        return this.httpClient.post<string>('http://localhost:8080/keycloak/users/create', user, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.oauthService.getAccessToken()}`
            }
        });
    }

    deleteUser(userId: string): Observable<void> {
        return this.httpClient.delete<void>(`http://localhost:8080/keycloak/users/delete/${userId}`, {
            headers: {
                Authorization: `Bearer ${this.oauthService.getAccessToken()}`
            }
        });
    }

    updateUser(userId: string, user: KeycloakUser): Observable<void> {
        return this.httpClient.put<void>(`http://localhost:8080/keycloak/users/update/${userId}`, user, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.oauthService.getAccessToken()}`
            }
        });
    }
}
