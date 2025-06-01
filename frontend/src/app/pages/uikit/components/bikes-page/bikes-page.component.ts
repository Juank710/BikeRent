import { MediaService } from './../../../../services/media/media.service';
import { Component } from '@angular/core';
import { Bike, BikeService } from '../../../../services/bikes/bikes.service';
import { BikeCardComponent } from './bike-card/bike-card.component';
import { AddModalBikeComponent } from './bike-card/add-modal/add-modal.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'bikes',
    standalone: true,
    imports: [BikeCardComponent, AddModalBikeComponent, CommonModule],
    templateUrl: './bikes-page.component.html',
    styleUrl: './bikes-page.component.css',
    providers: []
})
export class Bikes {
    bikes: Bike[] = [];

    constructor(
        private bikeService: BikeService,
        private mediaService: MediaService
    ) {}

    ngOnInit(): void {
        this.bikeService.getBikes().subscribe({
            next: (data) => (this.bikes = data),
            error: (err) => console.error('Error GET Bikes:', err)
        });
    }

}
