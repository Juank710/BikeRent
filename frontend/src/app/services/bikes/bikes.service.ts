import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

export interface Bike {
    id?: string;
    brand: string;
    model: string;
    type: string;
    size: string;
    pricePerHour: number;
    availability: boolean;
    src_image?: string;
    description: string;
}
@Injectable({
    providedIn: 'root'
})
export class BikeService {
    private apiUrl = 'http://localhost:8080/bike-rent/bikes';

    constructor(
        private http: HttpClient,
        private oauthService: OAuthService
    ) {}

    getBikes(): Observable<Bike[]> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.oauthService.getAccessToken()}`
        });

        return this.http.get<Bike[]>(this.apiUrl, { headers });
    }

    createBike(bike: Bike): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.oauthService.getAccessToken()}`
        });

        return this.http.post<any>(this.apiUrl, bike, { headers: headers });
    }

    deleteBike(bikeId: string): Observable<void> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.oauthService.getAccessToken()}` // Incluye el token de autorización
        });

        // Construye la URL completa para la eliminación
        return this.http.delete<void>(`${this.apiUrl}/${bikeId}`, { headers: headers });
    }

    updateBike(bike: Bike): Observable<Bike> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.oauthService.getAccessToken()}`
        });

        return this.http.put<Bike>(this.apiUrl, bike, { headers: headers });
    }
}
