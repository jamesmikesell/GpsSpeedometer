import { Component, OnInit, HostListener } from '@angular/core';
import { SpeedCalculator } from '../../classes/speed-calculator';

@Component({
    selector: 'app-speed-display',
    templateUrl: './speed-display.component.html',
    styleUrls: ['./speed-display.component.scss']
})
export class SpeedDisplayComponent implements OnInit {

    speed = new SpeedCalculator();

    constructor() { }

    ngOnInit(): void {
        this.speed.init();
    }

    @HostListener('window:resize', ['$event'])
    get fontHeight(): string {
        let maxWidth = window.innerWidth * .5;
        let maxHeight = window.innerHeight * .846;

        let size = Math.min(maxHeight, maxWidth);

        return `${size}px`;
    }

}
