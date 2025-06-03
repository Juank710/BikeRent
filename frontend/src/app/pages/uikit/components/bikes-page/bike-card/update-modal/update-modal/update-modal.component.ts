import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Bike, BikeService } from '../../../../../../../services/bikes/bikes.service';

@Component({
    selector: 'update-modal-bikes',
    imports: [DialogModule, ButtonModule, ReactiveFormsModule],
    templateUrl: './update-modal.component.html',
    styleUrl: './update-modal.component.scss'
})
export class UpdateModalBikesComponent {
    model = input.required<string>();
    brand = input.required<string>();
    size = input.required<string>();
    type = input.required<string>();
    bikeId = input.required<string>();
    description = input.required<string>();
    availability = input.required<string>();

    updateBike!: FormGroup;
    modelInput: FormControl;
    typeInput: FormControl;
    brandInput: FormControl;
    sizeInput: FormControl;
    descriptionInput: FormControl;
    pricePerHourInput: FormControl;
    availabilityInput: FormControl;

    constructor(private bikeService: BikeService) {
        this.modelInput = new FormControl('', [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z0-9\s\-\_]+$/) // Solo letras, números, espacios, guiones y guiones bajos
        ]);
        
        this.brandInput = new FormControl('', [
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern(/^[a-zA-Z\s\-]+$/) // Solo letras, espacios y guiones
        ]);
        
        this.sizeInput = new FormControl('', [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9\s]+$/) // Permitir letras, números y espacios para tamaños como "M", "Large", "26 pulgadas"
        ]);
        
        this.typeInput = new FormControl('', [
            Validators.required,
            Validators.pattern(/^[a-zA-Z\s\-]+$/) // Solo letras, espacios y guiones
        ]);
        
        this.descriptionInput = new FormControl('', [
            Validators.maxLength(100)
        ]);
        
        this.pricePerHourInput = new FormControl('', [
            Validators.required,
            Validators.min(5000),
            Validators.max(15000),
            Validators.pattern(/^\d+$/) // Solo números enteros
        ]);
        
        this.availabilityInput = new FormControl('', [
            Validators.required,
            Validators.pattern(/^(Disponible|No disponible)$/i) // Solo "Disponible" o "No disponible"
        ]);

        this.updateBike = new FormGroup({
            model: this.modelInput,
            brand: this.brandInput,
            size: this.sizeInput,
            type: this.typeInput,
            description: this.descriptionInput,
            availability: this.availabilityInput,
            pricePerHour: this.pricePerHourInput
        });
    }

    ngOnInit() {
        this.modelInput.setValue(this.model());
        this.brandInput.setValue(this.brand());
        this.typeInput.setValue(this.type());
        this.sizeInput.setValue(this.size());
        this.descriptionInput.setValue(this.description());
        this.availabilityInput.setValue(this.availability());
    }

    // Getter para verificar si el formulario es válido
    get isFormValid(): boolean {
        return this.updateBike.valid;
    }

    // Methods to get specific error messages
    getModelError(): string {
        if (this.modelInput.hasError('required')) return 'Model is required';
        if (this.modelInput.hasError('maxlength')) return 'Model cannot exceed 50 characters';
        if (this.modelInput.hasError('pattern')) return 'Model can only contain letters, numbers, spaces and hyphens';
        return '';
    }

    getBrandError(): string {
        if (this.brandInput.hasError('required')) return 'Brand is required';
        if (this.brandInput.hasError('maxlength')) return 'Brand cannot exceed 25 characters';
        if (this.brandInput.hasError('pattern')) return 'Brand can only contain letters, spaces and hyphens';
        return '';
    }

    getSizeError(): string {
        if (this.sizeInput.hasError('required')) return 'Size is required';
        if (this.sizeInput.hasError('pattern')) return 'Size must be valid';
        return '';
    }

    getTypeError(): string {
        if (this.typeInput.hasError('required')) return 'Type is required';
        if (this.typeInput.hasError('pattern')) return 'Type can only contain letters, spaces and hyphens';
        return '';
    }

    getDescriptionError(): string {
        if (this.descriptionInput.hasError('maxlength')) return 'Description cannot exceed 100 characters';
        return '';
    }

    getPriceError(): string {
        if (this.pricePerHourInput.hasError('required')) return 'Price per hour is required';
        if (this.pricePerHourInput.hasError('min')) return 'Minimum price is $5,000';
        if (this.pricePerHourInput.hasError('max')) return 'Maximum price is $15,000';
        if (this.pricePerHourInput.hasError('pattern')) return 'Price must be a whole number';
        return '';
    }

    getAvailabilityError(): string {
        if (this.availabilityInput.hasError('required')) return 'Availability is required';
        if (this.availabilityInput.hasError('pattern')) return 'Availability must be "Available" or "Not available"';
        return '';
    }

    putBike() {
        if (!this.isFormValid) {
            console.error('Form is not valid');
            return;
        }

        const updatedBike: Bike = {
            id: this.bikeId(),
            brand: this.updateBike.get('brand')?.value.trim(),
            model: this.updateBike.get('model')?.value.trim(),
            type: this.updateBike.get('type')?.value.trim(),
            size: this.updateBike.get('size')?.value.trim(),
            pricePerHour: this.updateBike.get('pricePerHour')?.value,
            availability: this.updateBike.get('availability')?.value.trim(),
            description: this.updateBike.get('description')?.value.trim()
        };

        this.bikeService.updateBike(updatedBike).subscribe({
            next: (responseBike) => {
                console.log('Bicycle updated successfully:', responseBike);
                this.close();
            },
            error: (err) => {
                console.error('Error updating bicycle:', err);
                console.log(updatedBike);
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