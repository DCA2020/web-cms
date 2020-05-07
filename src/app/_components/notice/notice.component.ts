import {Component, OnInit, ViewChild} from '@angular/core';
import {NoticeModel} from "@/_models/";
import {first} from "rxjs/operators";
import {
    ToolbarService,
    LinkService,
    ImageService,
    HtmlEditorService,
    RichTextEditorComponent
} from '@syncfusion/ej2-angular-richtexteditor';
import {NgForm} from "@angular/forms";
import {NoticeStateModel} from "@/_models/noticeState";
import {NoticeCategoryModel} from "@/_models/noticeCategory";
import {PersonModel} from "@/_models/person";
import {AlertService, NoticeCategoryService, NoticeService} from "@/_services";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {PaginationComponent} from "@/_directives/pagination/pagination.component";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import {FormBuilder, FormGroup, FormArray} from "@angular/forms";
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {DragdropService} from "@/_services/dragdrop-service.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Log} from "@/_utils";

@Component({
    selector: 'app-notice',
    templateUrl: './notice.component.html'
})
export class NoticeComponent implements OnInit {
    @ViewChild('fromRTE', null)
    private rteEle: RichTextEditorComponent;
    loading = false;
    loadingFull = false;
    public categorias: NoticeCategoryModel[];
    myLogger = new Log();

    public value: string = `<p>Digite el contenido de la noticia en esta area, puede usar formato html.</p>`
    public activeLang = 'es';
    submitted = false;
    noticias = [];
    title = 'appBootstrap';
    closeResult: string;
    creandoNuevo = false;
    actualizando = false;
    //#region PAGINACION
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
        screenReaderCurrentLabel: 'Estas en la pagina'
    };
    //#endregion
    fileArr = [];
    imgArr = [];
    fileObj = [];
    form: FormGroup;
    msg: string;
    progress: number = 0;

    //public value: string = null;

    constructor(private modalService: NgbModal,
                public noticeCategoryService: NoticeCategoryService,
                public noticeService: NoticeService,
                private alertService: AlertService,
                private translate: TranslateService,
                public fb: FormBuilder,
                private sanitizer: DomSanitizer,
                public dragdropService: DragdropService,
                private router: Router
    ) {
        this.translate.setDefaultLang(this.activeLang);
        this.loadingFull = true;
    }

    ngOnInit(): void {
        this.cargarTodasLasNoticias();
        this.form = this.fb.group({
            avatar: [null]
        })

        this.loading = false;
        this.loadingFull = false;
    }

    irAlDetalle(noticia_: NoticeModel): void {
        this.router.navigate(['/app-notice-detail', {enEdicion: 'false'} ]);
    }

    irAEdicion(noticia_: NoticeModel): void {
        this.noticeService.noticeInEditing = noticia_;
        this.router.navigate(['/app-notice-create', {enEdicion: 'true'}]);
    }

    onPageChange(event) {
        console.log('event:', event);
        this.config.currentPage = event;
    }

    exportAsPDF(MyDIv) {
        let data = document.getElementById(MyDIv);
        html2canvas(data).then(canvas => {
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
            // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
            pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
            pdf.save('Filename.pdf');
        });
    }



    // Clean Url
    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    eliminarNoticia(id: string) {
        this.noticeService.delete(id)
            .pipe(first())
            .subscribe(() => this.cargarTodasLasNoticias());
    }


    nuevaNoticia(): void {
        /*this.model = new NoticeModel(18,
            '18',
            'Titulo de la noticia.',
            '',
            '',
            '',
            this.noticeState,
            this.noticeCategory,
            '',
            '',
            1,
            1,
            0,
            true,
            this.persona,
            new Date(),
            this.persona,
            new Date(),
            '',
            '',
            true,
            '1080931527');*/
        this.creandoNuevo = true;
        this.submitted = false;
        this.actualizando = false;
    }

    cargarTodasLasNoticias() {
        this.noticeService.getAll()
            .pipe(first())
            .subscribe(noticias => {
                this.noticias = noticias;
                //this.paginacionComponent.array = this.noticias;
                //this.paginacionComponent.activate(this.noticias);
                this.config = {
                    id: 'custom',
                    itemsPerPage: 8,
                    currentPage: 1,
                    totalItems: this.noticias.length
                };
            });
    }

    open(content, noticeModel: NoticeModel) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            if (result == "Save click") {
                this.closeResult = `Closed with: ${result}`;
                this.eliminarNoticia(noticeModel._id);
            } else {
                this.closeResult = `Cancelado: ${result}`;
            }
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            console.log(this.closeResult);
        });

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
