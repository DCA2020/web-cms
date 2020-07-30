import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-link-external',
    templateUrl: './link-external.component.html',
    styleUrls: ['./link-external.component.css']
})
export class LinkExternalComponent implements OnInit {

    public activeTab = 'pills-home';

    constructor() {
    }

    ngOnInit(): void {
    }

    search(activeTab) {
        this.activeTab = activeTab;
    }

    result(activeTab) {
        this.activeTab = activeTab;
    }
}
