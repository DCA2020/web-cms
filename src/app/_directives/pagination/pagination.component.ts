import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
    public array: any;
    public config: any;

    public maxSize: number = 7;
    public directionLinks: boolean = true;
    public autoHide: boolean = false;
    public responsive: boolean = true;
    public labels: any = {
        previousLabel: '<--',
        nextLabel: '-->',
        screenReaderPaginationLabel: 'Paginacion',
        screenReaderPageLabel: 'pagina',
        screenReaderCurrentLabel: `Estas en la pagina`
    };

    constructor() {
    }

    activate(arrays: any): void{
        console.log('arrays:', arrays);
        if (arrays.length > 0) {
            this.config = {
                id: 'custom',
                itemsPerPage: 5,
                currentPage: 1,
                totalItems: arrays.length
            };
        }
    }

    ngOnInit(): void {
    }

    onPageChange(event) {
        console.log(event);
        this.config.currentPage = event;
    }
}
