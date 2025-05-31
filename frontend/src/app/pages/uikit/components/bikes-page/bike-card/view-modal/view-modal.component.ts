import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MediaService } from '../../../../../../services/media/media.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'view-modal-card',
    imports: [DialogModule, ButtonModule, CommonModule],
    templateUrl: './view-modal.component.html',
    styleUrl: './view-modal.component.scss'
})
export class ViewModalCardComponent {

    imageSrc: string = '';

    src_image = input.required<string>();
    id = input.required<string>();
    brand = input.required<string>();
    model = input.required<string>();
    type = input.required<string>();
    size = input.required<string>();
    price_per_hour = input.required<string>();
    description = input.required<string>();
    availability = input.required<string>();

    constructor(
        private mediaService: MediaService
    ){

    }

    ngOnInit(): void {
        const imageUrl = this.src_image();
        this.mediaService.getFile(imageUrl).subscribe(
            (url) => (this.imageSrc = url),
            (err) => console.error('Error al cargar la imagen', err)
        );
    }

    // Variables para controlar la visibilidad del modal
    display: boolean = false;
    displayConfirmation: boolean = false; // Si necesitas un modal de confirmación también

    // Métodos para abrir y cerrar el modal principal
    open() {
        this.display = true;
    }

    close() {
        this.display = false;
    }

    // Métodos para abrir y cerrar el modal de confirmación (si lo necesitas)
    openConfirmation() {
        this.displayConfirmation = true;
    }

    closeConfirmation() {
        this.displayConfirmation = false;
    }
}
