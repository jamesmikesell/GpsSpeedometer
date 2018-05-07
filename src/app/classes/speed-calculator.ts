import { DistanceCalculator } from "./distance-calculator";

export class SpeedCalculator {
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

        let distance = DistanceCalculator.getDistanceFromLatLonInMeters(currentPosition.coords, this.prevPosition.coords);

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
