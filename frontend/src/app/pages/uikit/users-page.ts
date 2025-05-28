import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { Customer, CustomerService, Representative } from '../service/customer.service';
import { Product, ProductService } from '../service/product.service';
import { KeycloakUser, UserService } from '../../services/keycloak/users.service';
import { ModalComponent } from '../../components/user-modal/user-modal.component';
import { WarningUserDeleteModalComponent } from '../../components/warning-user-delete-modal/warning-user-delete-modal.component';
import { WarningUserUpdateModalComponent } from '../../components/warning-user-update-modal/warning-user-update-modal.component';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'users',
    standalone: true,
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        ModalComponent,
        WarningUserDeleteModalComponent,
        WarningUserUpdateModalComponent
    ],
    template: ` <div class="card">
        <div class="font-semibold text-xl mb-4">User Management</div>
        <p-table
            #dt1
            [value]="users"
            dataKey="id"
            [rows]="10"
            [loading]="loading"
            [rowHover]="true"
            [showGridlines]="true"
            [paginator]="true"
            [globalFilterFields]="['id', 'username', 'firstName', 'lastName', 'email', 'roles']"
            responsiveLayout="scroll"
        >
            <ng-template #caption>
                <div class="flex justify-between items-center flex-column sm:flex-row">
                    <p-iconfield iconPosition="left" class="ml-auto">
                        <p-inputicon>
                            <i class="pi pi-search"></i>
                        </p-inputicon>
                        <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Search keyword" />
                    </p-iconfield>
                    <user-modal title="Create New User"></user-modal>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="min-width: 12rem">
                        <div class="flex justify-between items-center">
                            ID
                            <p-columnFilter type="text" field="name" display="menu" placeholder="Search by name"></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 12rem">
                        <div class="flex justify-between items-center">
                            User Name
                            <p-columnFilter type="text" field="name" display="menu" placeholder="Search by name"></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 12rem">
                        <div class="flex justify-between items-center">
                            Full Name
                            <p-columnFilter type="text" field="country.name" display="menu" placeholder="Search by country"></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 14rem">
                        <div class="flex justify-between items-center">
                            Email
                            <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                                <ng-template #header>
                                    <div class="px-3 pt-3 pb-0">
                                        <span class="font-bold">Agent Picker</span>
                                    </div>
                                </ng-template>
                                <ng-template #filter let-value let-filter="filterCallback">
                                    <p-multiselect [ngModel]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" styleClass="w-full">
                                        <ng-template let-option #item>
                                            <div class="flex items-center gap-2 w-44">
                                                <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="32" />
                                                <span>{{ option.name }}</span>
                                            </div>
                                        </ng-template>
                                    </p-multiselect>
                                </ng-template>
                            </p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 10rem">
                        <div class="flex justify-between items-center">
                            Rol
                            <p-columnFilter type="date" field="date" display="menu" placeholder="mm/dd/yyyy"></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 10rem">
                        <div class="flex justify-between items-center">
                            Actions
                            <p-columnFilter type="numeric" field="balance" display="menu" currency="USD"></p-columnFilter>
                        </div>
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-user>
                <tr>
                    <td>{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.firstName }} {{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.roles[0] }}</td>
                    <td>
                        <div class="flex gap-4">
                            <warning-user-update-modal  input_username="{{user.username}}" input_idUser=" {{user.id}} " input_email=" {{ user.email }} " input_firstName=" {{ user.firstName }} " input_lastName=" {{ user.lastName }} " input_role="{{user.role}}"></warning-user-update-modal>
                            <warning-user-delete-modal idUser=" {{ user.id }} " username=" {{ user.username }} " role=" {{ user.roles[0] }} "></warning-user-delete-modal>
                        </div>
                    </td>
                </tr>
            </ng-template>
            <ng-template #emptymessage>
                <tr>
                    <td colspan="8">No customers found.</td>
                </tr>
            </ng-template>
            <ng-template #loadingbody>
                <tr>
                    <td colspan="8">Loading customers data. Please wait.</td>
                </tr>
            </ng-template>
        </p-table>
    </div>`,
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class Users implements OnInit {
    selectedUserId!: string;

    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    balanceFrozen: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    users: KeycloakUser[] = [];

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach((customer) => (customer.date = new Date(customer.date)));
        });
        this.customerService.getCustomersMedium().then((customers) => (this.customers2 = customers));
        this.customerService.getCustomersLarge().then((customers) => (this.customers3 = customers));
        this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];

        this.userService.getUsers().subscribe({
            next: (users) => {
                this.users = users;
            },
            error: (err) => {
                console.error('Error al obtener usuarios', err);
            }
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
