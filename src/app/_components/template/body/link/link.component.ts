import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

    images = ['../../../../../assets/img/slider/afrocaq_slider1.png', '../../../../../assets/img/slider/afrocaq_slider1.png', '../../../../../assets/img/slider/afrocaq_slider1.png']
    // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

    constructor(config: NgbCarouselConfig) {
        // customize default values of carousels used by this component tree
        config.interval = 1500;
        config.wrap = false;
        config.keyboard = false;
        config.pauseOnHover = false;
        config.wrap = true;
    }

    ngOnInit(): void {
    }

}
