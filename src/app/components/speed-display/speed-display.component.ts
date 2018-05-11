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
        this.changeFullScreenMode(true);
        this.enabled = true;
    }

    stop(): void {
        this.noSleep.disable();
        this.changeFullScreenMode(false);
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

    private changeFullScreenMode(goFullScreen: boolean): void {
        let doc = window.document;
        let docEl = doc.documentElement;

        // let isFullScreen: boolean = !!doc.fullscreenElement || !!doc.webkitFullscreenElement;

        if (goFullScreen) {
            let requestFullScreen = docEl.requestFullscreen || docEl.webkitRequestFullScreen;
            requestFullScreen.call(docEl);
        } else {
            let cancelFullScreen = doc.exitFullscreen || doc.webkitExitFullscreen;
            cancelFullScreen.call(doc);
        }
    }

    getMirrorRotateStyle(): string {
        if (this.mirror && this.rotate)
            return "mirror-rotate";

        if (this.mirror)
            return "mirror";
        if (this.rotate)
            return "rotate";

        return "";
    }

    @HostListener('window:resize', ['$event'])
    private setFontHeight(): void {
        let maxWidth = window.innerWidth * .5;
        let maxHeight = window.innerHeight * .846;

        let size = Math.min(maxHeight, maxWidth);

        this.fontHeight = `${size}px`;
    }

}
