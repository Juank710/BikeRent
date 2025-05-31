import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
        this.modelInput = new FormControl('');
        this.brandInput = new FormControl('');
        this.sizeInput = new FormControl('');
        this.typeInput = new FormControl('');
        this.descriptionInput = new FormControl('');
        this.pricePerHourInput = new FormControl('');
        this.availabilityInput = new FormControl('');

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

    putBike() {
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
                console.log('Bicicleta actualizada exitosamente:', responseBike);
                this.close();
            },
            error: (err) => {
                console.error('Error al actualizar la bicicleta:', err);
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
