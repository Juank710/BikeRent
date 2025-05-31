import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BikeService } from '../../../../../../../services/bikes/bikes.service';

@Component({
    selector: 'delete-modal-bike',
    imports: [DialogModule, ButtonModule],
    templateUrl: './delete-modal.component.html',
    styleUrl: './delete-modal.component.scss'
})
export class DeleteModalBikeComponent {
    id = input.required<string>();
    model = input.required<string>();

    constructor(private bikeService: BikeService) {}

    confirmComplete() {
        this.bikeService.deleteBike(this.id().trim()).subscribe({
            next: () => {
                console.log(`Bicicleta con ID ${this.id()} eliminada exitosamente.`);
            },
            error: (err) => {
                console.error(`Error al eliminar la bicicleta con ID ${this.id()}:`, err);
            }
        });
        this.close();
    }

    display: boolean = false;
    displayConfirmation: boolean = false;

    open() {
        this.display = true;
    }

    close() {
        this.display = false;
    }

    openConfirmation() {
        this.displayConfirmation = true;
    }

    closeConfirmation() {
        this.displayConfirmation = false;
    }
}
