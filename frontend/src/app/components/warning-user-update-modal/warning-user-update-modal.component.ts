import { Component, input, OnInit } from '@angular/core';
import { Popover } from 'primeng/popover';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { KeycloakUser, UserService } from '../../services/keycloak/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'warning-user-update-modal',
    imports: [DialogModule, ReactiveFormsModule],
    templateUrl: './warning-user-update-modal.component.html',
    styleUrl: './warning-user-update-modal.component.scss'
})
export class WarningUserUpdateModalComponent implements OnInit {
    input_idUser = input.required<string>();
    input_firstName = input.required<string>();
    input_lastName = input.required<string>();
    input_username = input.required<string>();
    input_email = input.required<string>();
    input_role = input.required<string>();

    updateForm!: FormGroup;
    firstName: FormControl;
    lastName: FormControl;
    email: FormControl;
    password: FormControl;

    images: any[] = [];
    display: boolean = false;
    isLoading: boolean = false;
    isFormSubmitted: boolean = false;

    visibleLeft: boolean = false;
    visibleRight: boolean = false;
    visibleTop: boolean = false;
    visibleBottom: boolean = false;
    visibleFull: boolean = false;
    displayConfirmation: boolean = false;

    constructor(
        private messageService: MessageService,
        private userService: UserService
    ) {
        // Validations for each field
        this.firstName = new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/) // Only letters and spaces
        ]);

        this.lastName = new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/) // Only letters and spaces
        ]);

        this.email = new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.maxLength(100)
        ]);

        this.password = new FormControl('', [
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/) // At least: 1 lowercase, 1 uppercase, 1 number, 1 special character
        ]);

        this.updateForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        });
    }

    ngOnInit() {
        this.firstName.setValue(this.input_firstName());
        this.lastName.setValue(this.input_lastName());
        this.email.setValue(this.input_email());
        this.password.setValue('');
    }

    // Methods to get specific errors
    getFirstNameErrors(): string {
        const control = this.firstName;
        if (control.errors && (control.dirty || control.touched || this.isFormSubmitted)) {
            if (control.errors['required']) return 'First name is required';
            if (control.errors['minlength']) return 'First name must be at least 2 characters';
            if (control.errors['maxlength']) return 'First name cannot exceed 50 characters';
            if (control.errors['pattern']) return 'First name can only contain letters and spaces';
        }
        return '';
    }

    getLastNameErrors(): string {
        const control = this.lastName;
        if (control.errors && (control.dirty || control.touched || this.isFormSubmitted)) {
            if (control.errors['required']) return 'Last name is required';
            if (control.errors['minlength']) return 'Last name must be at least 2 characters';
            if (control.errors['maxlength']) return 'Last name cannot exceed 50 characters';
            if (control.errors['pattern']) return 'Last name can only contain letters and spaces';
        }
        return '';
    }

    getEmailErrors(): string {
        const control = this.email;
        if (control.errors && (control.dirty || control.touched || this.isFormSubmitted)) {
            if (control.errors['required']) return 'Email is required';
            if (control.errors['email']) return 'Please enter a valid email';
            if (control.errors['maxlength']) return 'Email cannot exceed 100 characters';
        }
        return '';
    }

    getPasswordErrors(): string {
        const control = this.password;
        if (control.errors && (control.dirty || control.touched || this.isFormSubmitted)) {
            if (control.errors['minlength']) return 'Password must be at least 8 characters';
            if (control.errors['pattern']) return 'Password must contain at least: 1 uppercase, 1 lowercase, 1 number and 1 special character';
        }
        return '';
    }

    // Methods to check if a field has errors
    hasFieldError(fieldName: string): boolean {
        const control = this.updateForm.get(fieldName);
        return !!(control?.errors && (control.dirty || control.touched || this.isFormSubmitted));
    }

    handleSubmit(event?: Event) {
        if (event) {
            event.preventDefault();
        }

        this.isFormSubmitted = true;

        // Validate form before submitting
        if (this.updateForm.invalid) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Invalid form',
                detail: 'Please correct the errors before continuing',
                life: 5000
            });
            return;
        }

        // Check if there are actually changes
        const formValues = this.updateForm.value;
        const hasChanges = 
            formValues.firstName.trim() !== this.input_firstName() ||
            formValues.lastName.trim() !== this.input_lastName() ||
            formValues.email.trim() !== this.input_email() ||
            (formValues.password && formValues.password.trim() !== '');

        if (!hasChanges) {
            this.messageService.add({
                severity: 'info',
                summary: 'No changes',
                detail: 'No changes detected to update',
                life: 3000
            });
            return;
        }

        this.isLoading = true;

        const updatedUser: KeycloakUser = {
            username: this.input_username().trim(),
            firstName: formValues.firstName.trim(),
            lastName: formValues.lastName.trim(),
            email: formValues.email.trim(),
            ...(formValues.password && formValues.password.trim() && { password: formValues.password.trim() })
        };

        this.userService.updateUser(this.input_idUser().trim(), updatedUser).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'User updated',
                    detail: 'User has been updated successfully',
                    life: 3000
                });
                this.close();
                console.log("User UPDATE successfully", response);
            },
            error: (error) => {
                this.isLoading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Update error',
                    detail: error.error?.message || 'An error occurred while updating the user',
                    life: 5000
                });
                console.log("Update Error", error);
            }
        });
    }

    open() {
        this.display = true;
        this.isFormSubmitted = false;
        // Reset form to initial values
        this.firstName.setValue(this.input_firstName());
        this.lastName.setValue(this.input_lastName());
        this.email.setValue(this.input_email());
        this.password.setValue('');
        this.updateForm.markAsUntouched();
        this.updateForm.markAsPristine();
    }

    close() {
        this.display = false;
        this.isLoading = false;
        this.isFormSubmitted = false;
    }

    // Method to clear only the password
    clearPassword() {
        this.password.setValue('');
        this.password.markAsUntouched();
        this.password.markAsPristine();
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