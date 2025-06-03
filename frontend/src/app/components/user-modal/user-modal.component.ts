import { Component, Injectable, input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Popover } from 'primeng/popover';
import { Product, ProductService } from '../../pages/service/product.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
        this.firstName = new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        ]);
        
        this.lastName = new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        ]);
        
        this.username = new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[a-zA-Z0-9_.-]+$/)
        ]);
        
        this.email = new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.maxLength(100)
        ]);
        
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        ]);
        
        this.role = new FormControl('', [
            Validators.required
        ]);

        this.userForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role
        });
    }

    // Métodos para obtener errores específicos de cada campo
    getFirstNameError(): string {
        if (this.firstName.hasError('required')) return 'First name is required';
        if (this.firstName.hasError('minlength')) return 'First name must be at least 2 characters';
        if (this.firstName.hasError('maxlength')) return 'First name cannot exceed 50 characters';
        if (this.firstName.hasError('pattern')) return 'First name can only contain letters and spaces';
        return '';
    }

    getLastNameError(): string {
        if (this.lastName.hasError('required')) return 'Last name is required';
        if (this.lastName.hasError('minlength')) return 'Last name must be at least 2 characters';
        if (this.lastName.hasError('maxlength')) return 'Last name cannot exceed 50 characters';
        if (this.lastName.hasError('pattern')) return 'Last name can only contain letters and spaces';
        return '';
    }

    getUsernameError(): string {
        if (this.username.hasError('required')) return 'Username is required';
        if (this.username.hasError('minlength')) return 'Username must be at least 3 characters';
        if (this.username.hasError('maxlength')) return 'Username cannot exceed 20 characters';
        if (this.username.hasError('pattern')) return 'Username can only contain letters, numbers, dots, hyphens and underscores';
        return '';
    }

    getEmailError(): string {
        if (this.email.hasError('required')) return 'Email is required';
        if (this.email.hasError('email')) return 'Please enter a valid email address';
        if (this.email.hasError('maxlength')) return 'Email cannot exceed 100 characters';
        return '';
    }

    getPasswordError(): string {
        if (this.password.hasError('required')) return 'Password is required';
        if (this.password.hasError('minlength')) return 'Password must be at least 8 characters';
        if (this.password.hasError('maxlength')) return 'Password cannot exceed 50 characters';
        if (this.password.hasError('pattern')) return 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
        return '';
    }

    getRoleError(): string {
        if (this.role.hasError('required')) return 'Role is required';
        return '';
    }

    handleSubmit() {
        // Marcar todos los campos como tocados para mostrar errores
        this.userForm.markAllAsTouched();
        
        if (this.userForm.valid) {
            const formValues = this.userForm.value;
            const newUser: KeycloakUser = {
                firstName: formValues.firstName.trim(),
                lastName: formValues.lastName.trim(),
                username: formValues.username.trim(),
                email: formValues.email.trim(),
                password: formValues.password,
                role: formValues.role
            };
            
            this.userService.createUser(newUser).subscribe({
                next: () => {
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Success', 
                        detail: 'User created successfully' 
                    });
                    this.resetForm();
                    this.close();
                },
                error: (err) => {
                    console.error(err);
                    this.messageService.add({ 
                        severity: 'error', 
                        summary: 'Error', 
                        detail: 'There was a problem creating the user' 
                    });
                }
            });
        } else {
            this.messageService.add({ 
                severity: 'warn', 
                summary: 'Validation Error', 
                detail: 'Please correct the errors in the form' 
            });
        }
    }

    resetForm() {
        this.userForm.reset();
        this.userForm.markAsUntouched();
        this.userForm.markAsPristine();
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
        this.resetForm();
    }

    close() {
        this.display = false;
        this.resetForm();
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