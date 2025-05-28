import { Component, input, OnInit } from '@angular/core';
import { Popover } from 'primeng/popover';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { KeycloakUser, UserService } from '../../services/keycloak/users.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
        this.firstName = new FormControl('');
        this.lastName = new FormControl('');
        this.email = new FormControl('');
        this.password = new FormControl('');

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

    handleSubmit() {
        const formValues = this.updateForm.value;
        const updatedUser: KeycloakUser = {
            username: this.input_username().trim(),
            firstName: formValues.firstName.trim(),
            lastName: formValues.lastName.trim(),
            password: formValues.password.trim(),
            email: formValues.email.trim(),
        };
        this.userService.updateUser(this.input_idUser().trim(), updatedUser).subscribe({
            next: () => {
                console.log("User UPDATE succesfully")
            },
            error: (error) => {
                console.log("Update Error");
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
