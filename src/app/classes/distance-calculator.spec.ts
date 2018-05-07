import { DistanceCalculator } from "./distance-calculator";


describe('Distance Measurer', () => {

    it('measure distance 1', () => {
        let coordinate1: Coordinates = {
            latitude: 40.489926,
            longitude: -80.247954,
            accuracy: undefined,
            altitude: undefined,
            altitudeAccuracy: undefined,
            heading: undefined,
            speed: undefined
        };

        let coordinate2: Coordinates = {
            latitude: 40.488905,
            longitude: -80.209042,
            accuracy: undefined,
            altitude: undefined,
            altitudeAccuracy: undefined,
            heading: undefined,
            speed: undefined
        };

        //40.489926, -80.247954
        //40.488905, -80.209042
        //3.29km

        let distance = DistanceCalculator.getDistanceFromLatLonInMeters(coordinate1, coordinate2);

        expect(distance.toFixed(2)).toEqual("3296.30");
    });

    it('measure distance 2', () => {
        let coordinate1: Coordinates = {
            latitude: 40.489930,
            longitude: -80.248118,
            accuracy: undefined,
            altitude: undefined,
            altitudeAccuracy: undefined,
            heading: undefined,
            speed: undefined
        };

        let coordinate2: Coordinates = {
            latitude: 40.489926,
            longitude: -80.247954,
            accuracy: undefined,
            altitude: undefined,
            altitudeAccuracy: undefined,
            heading: undefined,
            speed: undefined
        };

        //40.489930, -80.248118
        //40.489926, -80.247954        
        //13.82 m        

        let distance = DistanceCalculator.getDistanceFromLatLonInMeters(coordinate1, coordinate2);

        expect(distance.toFixed(2)).toEqual("13.89");
    });


    it('measure distance 1 in reverse', () => {
        let coordinate1: Coordinates = {
            latitude: 40.489930,
            longitude: -80.248118,
            accuracy: undefined,
            altitude: undefined,
            altitudeAccuracy: undefined,
            heading: undefined,
            speed: undefined
        };

        let coordinate2: Coordinates = {
            latitude: 40.489926,
            longitude: -80.247954,
            accuracy: undefined,
            altitude: undefined,
            altitudeAccuracy: undefined,
            heading: undefined,
            speed: undefined
        };

        //40.489930, -80.248118
        //40.489926, -80.247954        
        //13.82 m        

        let distance = DistanceCalculator.getDistanceFromLatLonInMeters(coordinate2, coordinate1);

        expect(distance.toFixed(2)).toEqual("13.89");
    });

});
