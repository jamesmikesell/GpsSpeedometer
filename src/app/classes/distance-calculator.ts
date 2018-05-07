export class DistanceCalculator {
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
