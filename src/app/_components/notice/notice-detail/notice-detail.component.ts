import {Component, OnInit} from '@angular/core';
import {DragdropService} from "@/_services/dragdrop-service.service";
import {ActivatedRoute} from "@angular/router";
import {NoticeModel} from "@/_models";
import {Log} from "@/_utils";
import {NoticeService} from "@/_services";

@Component({
    selector: 'app-notice-detail',
    templateUrl: './notice-detail.component.html',
    styleUrls: ['./notice-detail.component.css']
})
export class NoticeDetailComponent implements OnInit {

    noticia: any;
    myLogger = new Log();

    constructor(private rutaActiva: ActivatedRoute,
                public noticeService: NoticeService) {
    }

    ngOnInit(): void {
        this.noticia = this.noticeService.noticeInEditing;
        this.myLogger.info('this.noticia en detalle: ', {data: this.noticia})
    }

}
