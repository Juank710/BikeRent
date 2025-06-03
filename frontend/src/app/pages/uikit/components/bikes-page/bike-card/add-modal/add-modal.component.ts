import { Bike, BikeService } from './../../../../../../services/bikes/bikes.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MediaService } from '../../../../../../services/media/media.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'add-modal-bike',
    imports: [DialogModule, ButtonModule, ReactiveFormsModule, CommonModule],
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
        this.brand = new FormControl('', [
            Validators.required,
            Validators.maxLength(25)
        ]);
        
        this.model = new FormControl('', [
            Validators.required,
            Validators.maxLength(50)
        ]);
        
        this.type = new FormControl('', [
            Validators.required
        ]);
        
        this.size = new FormControl('', [
            Validators.required
        ]);
        
        this.pricePerHour = new FormControl(null, [
            Validators.required,
            Validators.min(5000),
            Validators.max(15000)
        ]);
        
        this.availability = new FormControl('Available');
        
        this.description = new FormControl('', [
            Validators.maxLength(100)
        ]);
        
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

            this.mediaService.uploadFile(formData).subscribe({
                next: (response) => {
                    this.urlImage = response.url;
                },
                error: (err) => {
                    console.error('Error uploading the image:', err);
                }
            });
        }
    }

    handleSubmit(): void {
        if (this.bikeForm.valid) {
            const formValues = this.bikeForm.value;

            const newBike: Bike = {
                brand: formValues.brand,
                model: formValues.model,
                type: formValues.type,
                size: formValues.size,
                pricePerHour: formValues.pricePerHour,
                availability: formValues.availability,
                description: formValues.description || '',
                src_image: this.urlImage
            };

            this.bikeService.createBike(newBike).subscribe({
                next: () => {
                    console.log('Bicycle created correctly');
                    this.bikeForm.reset();
                    this.close();
                },
                error: (err) => {
                    console.error('Error when creating the bicycle:', err);
                }
            });
        } else {
            // Marcar todos los campos como tocados para mostrar errores
            Object.keys(this.bikeForm.controls).forEach(key => {
                this.bikeForm.get(key)?.markAsTouched();
            });
        }
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