import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
        <div>
            {{ helloText }}
        </div>`
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'Actions',
                items: [
                    { label: 'Users', icon: 'pi pi-users', routerLink: ['/uikit/users'] },
                    { label: 'Bikes', icon: 'bi bi-bicycle', routerLink: ['/uikit/bikes'] },
                    { label: 'Rents', icon: 'pi pi-address-book', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                    { label: 'Payments', icon: 'pi pi-money-bill', routerLink: ['/uikit/formlayout'] },
                    { label: 'Log Out', icon: 'pi pi-sign-out', command: () => this.logout() }
                ]
            }
        ];
    }

    helloText = '';

    constructor(
        private oauthService: OAuthService,
        private httpClient: HttpClient
    ) {}

    logout() {
        this.oauthService.logOut();
    }
}
