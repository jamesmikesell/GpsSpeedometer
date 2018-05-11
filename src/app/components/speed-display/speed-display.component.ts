import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { SpeedCalculator } from '../../classes/speed-calculator';
import * as NoSleep from 'nosleep.js';

@Component({
    selector: 'app-speed-display',
    templateUrl: './speed-display.component.html',
    styleUrls: ['./speed-display.component.scss']
})
export class SpeedDisplayComponent implements OnInit {

    speed = new SpeedCalculator(5);
    fontHeight: string;
    noSleep = new NoSleep();
    enabled = false;
    mirror = false;
    rotate = false;
    
    private colorInverted = false;

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void {
        this.speed.init();
        this.setFontHeight();
    }

    start(): void {
        this.noSleep.enable();
        this.toggleFullScreen();
        this.enabled = true;
    }

    stop(): void{
        this.noSleep.disable();
        this.toggleFullScreen();
        this.enabled = false;
    }

    toggleInvertColors(): void {
        if (this.colorInverted) {
            this.renderer.removeClass(document.body, 'invert');
        } else {
            this.renderer.addClass(document.body, 'invert');
        }

        this.colorInverted = !this.colorInverted;
    }

    toggleFullScreen(): void {
        let doc = window.document;
        let docEl = doc.documentElement;

        let requestFullScreen = docEl.requestFullscreen || docEl.webkitRequestFullScreen;
        let cancelFullScreen = doc.exitFullscreen || doc.webkitExitFullscreen;

        if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
            requestFullScreen.call(docEl);
        }
        else {
            cancelFullScreen.call(doc);
        }
    }

    @HostListener('window:resize', ['$event'])
    private setFontHeight(): void {
        let maxWidth = window.innerWidth * .5;
        let maxHeight = window.innerHeight * .846;

        let size = Math.min(maxHeight, maxWidth);

        this.fontHeight = `${size}px`;
    }

}
