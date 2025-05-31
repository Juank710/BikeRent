import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MediaService {
    private apiUrl = 'http://localhost:8080/bike-rent/bikes/upload';

    constructor(
        private http: HttpClient,
        private oauthService: OAuthService
    ) {}

    uploadFile(formData: FormData): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.oauthService.getAccessToken()}`
        });

        return this.http.post<any>(this.apiUrl, formData, { headers });
    }

    getFile(imageUrl: string): Observable<string> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.oauthService.getAccessToken()}`
        });

        return this.http.get<Blob>(imageUrl, { headers, responseType: 'blob' as 'json' }).pipe(map((blob) => URL.createObjectURL(blob)));
    }
}
