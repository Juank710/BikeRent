import { Component, input } from '@angular/core';
import { Popover } from 'primeng/popover';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { UserService } from '../../services/keycloak/users.service';

@Component({
    selector: 'warning-user-delete-modal',
    imports: [DialogModule],
    templateUrl: './warning-user-delete-modal.component.html',
    styleUrl: './warning-user-delete-modal.component.scss'
})
export class WarningUserDeleteModalComponent {
    idUser = input.required<string>();
    username = input.required<string>();
    role = input.required<string>();

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
    ) {}

    confirmComplete() {
        this.userService.deleteUser(this.idUser().trim()).subscribe({
            next: () => {
                console.log("User delete")
                this.close();
            },
            error: (err) => {
                console.error('Error deleting user', err);
                this.close();
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