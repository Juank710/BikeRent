import { Bike, BikeService } from './../../../../../../services/bikes/bikes.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MediaService } from '../../../../../../services/media/media.service';

@Component({
    selector: 'add-modal-bike',
    imports: [DialogModule, ButtonModule, ReactiveFormsModule],
    templateUrl: './add-modal.component.html',
    styleUrl: './add-modal.component.scss'
})
export class AddModalBikeComponent {

    urlImage!: string;

    bikeForm!: FormGroup;
    brand: FormControl;
    model: FormControl;
    type: FormControl;
    size: FormControl;
    pricePerHour: FormControl;
    availability: FormControl;
    description: FormControl;
    src_image: FormControl;

    constructor(
        private bikeService: BikeService,
        private mediaService: MediaService
    ) {
        this.brand = new FormControl('');
        this.model = new FormControl('');
        this.type = new FormControl('');
        this.size = new FormControl('');
        this.pricePerHour = new FormControl(null);
        this.availability = new FormControl('Available');
        this.description = new FormControl('');
        this.src_image = new FormControl('');
        this.bikeForm = new FormGroup({
            brand: this.brand,
            model: this.model,
            type: this.type,
            size: this.size,
            availability: this.availability,
            pricePerHour: this.pricePerHour,
            description: this.description,
            src_image: this.src_image
        });
    }

    upload(event: any) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            this.mediaService.uploadFile(formData).subscribe((response) => {
                this.urlImage = response.url;
            });
        }
    }

    handleSubmit(): void {
        const formValues = this.bikeForm.value;

        const newBike: Bike = {
            brand: formValues.brand,
            model: formValues.model,
            type: formValues.type,
            size: formValues.size,
            pricePerHour: formValues.pricePerHour,
            availability: formValues.availability,
            description: formValues.description,
            src_image: this.urlImage
        };

        this.bikeService.createBike(newBike).subscribe({
            next: () => {
                console.log('Bicicleta creada correctamente');
                this.bikeForm.reset();
            },
            error: (err) => {
                console.error(err);
            }
        });
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
