import { Component, Injectable, input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Popover } from 'primeng/popover';
import { Product, ProductService } from '../../pages/service/product.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KeycloakUser, UserService } from '../../services/keycloak/users.service';

@Component({
    selector: 'user-modal',
    imports: [DialogModule, ButtonModule, ReactiveFormsModule],
    templateUrl: './user-modal.component.html',
    styleUrl: './user-modal.component.scss'
})
@Injectable({ providedIn: 'root' })
export class ModalComponent implements OnInit {

    title = input.required<string>();

    images: any[] = [];

    display: boolean = false;

    products: Product[] = [];

    visibleLeft: boolean = false;

    visibleRight: boolean = false;

    visibleTop: boolean = false;

    visibleBottom: boolean = false;

    visibleFull: boolean = false;

    displayConfirmation: boolean = false;

    selectedProduct!: Product;

    userForm!: FormGroup;
    firstName: FormControl;
    lastName: FormControl;
    username: FormControl;
    email: FormControl;
    password: FormControl;
    role: FormControl;

    constructor(
        private productService: ProductService,
        private userService: UserService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,

    ) {
        this.firstName = new FormControl('');
        this.lastName = new FormControl('');
        this.username = new FormControl('');
        this.email = new FormControl('');
        this.role = new FormControl('');
        this.password = new FormControl('');

        this.userForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role
        });
    }

    handleSubmit() {
        const formValues = this.userForm.value;
        const newUser: KeycloakUser = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            username: formValues.username,
            email: formValues.email,
            password: formValues.password,
            role: formValues.role
        };
        this.userService.createUser(newUser).subscribe({
            next: () => {
                this.close();
            },
            error: (err) => {
                console.error(err);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was a problem creating the user' });
            }
        });
    }

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => (this.products = products));

        this.images = [];
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos1.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos1_small.jpg',
            title: 'Sopranos 1'
        });
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos2.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos2_small.jpg',
            title: 'Sopranos 2'
        });
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos3.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos3_small.jpg',
            title: 'Sopranos 3'
        });
        this.images.push({
            source: 'assets/demo/images/sopranos/sopranos4.jpg',
            thumbnail: 'assets/demo/images/sopranos/sopranos4_small.jpg',
            title: 'Sopranos 4'
        });
    }

    confirm(event: Event) {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target || new EventTarget(),
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

    open() {
        this.display = true;
    }

    close() {
        this.display = false;
    }

    toggleDataTable(op: Popover, event: any) {
        op.toggle(event);
    }

    onProductSelect(op: Popover, event: any) {
        op.hide();
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event?.data.name, life: 3000 });
    }

    openConfirmation() {
        this.displayConfirmation = true;
    }

    closeConfirmation() {
        this.displayConfirmation = false;
    }
}
