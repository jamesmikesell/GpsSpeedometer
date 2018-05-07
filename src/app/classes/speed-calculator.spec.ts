import { SpeedCalculator } from "./speed-calculator";


describe('Speed Calculator', () => {
    it('measure speed', () => {
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
        //13.89 m        


        let pos1: Position = {
            coords: coordinate1,
            timestamp: (new Date("Mon May 07 2018 11:11:00 GMT-0400 (EDT)")).getTime()
        };

        let pos2: Position = {
            coords: coordinate2,
            timestamp: (new Date("Mon May 07 2018 11:11:03 GMT-0400 (EDT)")).getTime()
        };

        let pos3: Position = {
            coords: coordinate1,
            timestamp: (new Date("Mon May 07 2018 11:11:06 GMT-0400 (EDT)")).getTime()
        };

        let positions = [pos1, pos2, pos3];

        let calc = new SpeedCalculator(2);
        calc.test(positions);

        expect(calc.averageSpeedMph.toFixed(2)).toEqual("10.36");
    });



    it('measure speed average', () => {
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
        //13.89 m        


        let pos1: Position = {
            coords: coordinate1,
            timestamp: (new Date("Mon May 07 2018 11:11:00 GMT-0400 (EDT)")).getTime()
        };

        let pos2: Position = {
            coords: coordinate2,
            timestamp: (new Date("Mon May 07 2018 11:11:03 GMT-0400 (EDT)")).getTime()
        };

        let pos3: Position = {
            coords: coordinate1,
            timestamp: (new Date("Mon May 07 2018 11:11:09 GMT-0400 (EDT)")).getTime()
        };

        let positions = [pos1, pos2, pos3];

        let calc = new SpeedCalculator(2);
        calc.test(positions);

        expect(calc.averageSpeedMph.toFixed(2)).toEqual("7.77");
    });


    it('measure speed no average', () => {
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
        //13.89 m        


        let pos1: Position = {
            coords: coordinate1,
            timestamp: (new Date("Mon May 07 2018 11:11:00 GMT-0400 (EDT)")).getTime()
        };

        let pos2: Position = {
            coords: coordinate2,
            timestamp: (new Date("Mon May 07 2018 11:11:03 GMT-0400 (EDT)")).getTime()
        };

        let pos3: Position = {
            coords: coordinate1,
            timestamp: (new Date("Mon May 07 2018 11:11:09 GMT-0400 (EDT)")).getTime()
        };

        let positions = [pos1, pos2, pos3];

        let calc = new SpeedCalculator(1);
        calc.test(positions);

        expect(calc.averageSpeedMph.toFixed(2)).toEqual("5.18");
    });

});
