import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { routes } from './app.routes';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8180/realms/bike-rent-realm',
  tokenEndpoint: 'http://localhost:8180/realms/bike-rent-realm/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'admin-client',
  responseType: 'code',
  scope: 'openid profile',
  showDebugInformation: true,
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideOAuthClient(),
        {
            provide: APP_INITIALIZER,
            useFactory: (oauthService: OAuthService) => {
                return () => {
                initializeOAuth(oauthService);
                }
            },
            multi: true,
            deps: [
                OAuthService
            ]
        },
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })
    ]
};

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => resolve());
  });
}

