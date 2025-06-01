import { Component, input } from '@angular/core';
import { ViewModalCardComponent } from './view-modal/view-modal.component';
import { MediaService } from '../../../../../services/media/media.service';
import { CommonModule } from '@angular/common';
import { DeleteModalBikeComponent } from "./delete-modal/delete-modal/delete-modal.component";
import { UpdateModalBikesComponent } from "./update-modal/update-modal/update-modal.component";

@Component({
    selector: 'bike-card',
    imports: [ViewModalCardComponent, CommonModule, DeleteModalBikeComponent, UpdateModalBikesComponent],
    templateUrl: './bike-card.component.html',
    styleUrl: './bike-card.component.css'
})
export class BikeCardComponent {

    imageSrc: string = '';

    constructor(
        private mediaService: MediaService
    ){}

    model = input.required<string>();
    src_image = input.required<string>();
    id = input.required<string>();
    type = input.required<string>();
    brand = input.required<string>();
    size = input.required<string>();
    description = input.required<string>();
    price_per_hour = input.required<string>();
    availability = input.required<string>();

    ngOnInit(): void {
        const imageUrl = this.src_image();
        this.mediaService.getFile(imageUrl).subscribe(
            (url) => (this.imageSrc = url),
            (err) => console.error('Error al cargar la imagen', err)
        );
    }
}
