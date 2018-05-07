import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-speed-display',
    templateUrl: './speed-display.component.html',
    styleUrls: ['./speed-display.component.scss']
})
export class SpeedDisplayComponent implements OnInit {

    speed = new GpsSpeedCalculator();

    constructor() { }

    ngOnInit(): void {
        this.speed.init();
    }

    get fontHeight(): string {
        // let maxWidth = window.innerWidth * .5;
        let maxHeight = window.innerHeight * .846;

        let size = maxHeight;
        // if()

        return `${size}px`;
    }

}


export class GpsSpeedCalculator {
    private prevPosition: Position;
    private previousSpeeds: Array<number> = [];

    averageSpeedMph: number = 0;

    constructor(public avgSampleSize = 2, private minPositionAccuracy?: number) { }

    init(): void {
        navigator.geolocation.watchPosition(position => this.calculateSpeed(position),
            null,
            { enableHighAccuracy: true });
    }

    test(positions: Position[]): void {
        positions.forEach(position => this.calculateSpeed(position));
    }

    private calculateSpeed(currentPosition: Position): void {
        if (this.minPositionAccuracy && currentPosition.coords.accuracy && currentPosition.coords.accuracy < this.minPositionAccuracy)
            return;

        if (!this.prevPosition) {
            this.prevPosition = currentPosition;
            return;
        }

        if (this.prevPosition.timestamp === currentPosition.timestamp)
            return;

        let distance = GpsDistanceCalculator.getDistanceFromLatLonInMeters(currentPosition.coords, this.prevPosition.coords);

        let time = currentPosition.timestamp - this.prevPosition.timestamp;
        let mps = distance / (time / 1000);
        let mph = mps * 2.23694;

        this.previousSpeeds.push(mph);

        if (this.previousSpeeds.length > this.avgSampleSize)
            this.previousSpeeds.splice(0, this.previousSpeeds.length - this.avgSampleSize);

        let calculatedAvg = 0;
        this.previousSpeeds.forEach((speed: number) => {
            calculatedAvg = calculatedAvg + (speed / this.previousSpeeds.length);
        });

        this.averageSpeedMph = calculatedAvg;
        this.prevPosition = currentPosition;
    }
}

export class GpsDistanceCalculator {
    static getDistanceFromLatLonInMeters(coords1: Coordinates, coords2: Coordinates): number {
        let R = 6378137; // Radius of the earth in km
        let dLat = this.deg2rad(coords2.latitude - coords1.latitude);  // deg2rad below
        let dLon = this.deg2rad(coords2.longitude - coords1.longitude);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(this.deg2rad(coords1.latitude)) * Math.cos(this.deg2rad(coords2.latitude))
            * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return d;
    }

    private static deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}
