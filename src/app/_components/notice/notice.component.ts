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

    public value: string = `<p>Digite el contenido de la noticia en esta area, puede usar formato html.</p>`
    public activeLang = 'es';
    submitted = false;
    noticias = [];
    title = 'appBootstrap';
    closeResult: string;
    creandoNuevo = false;
    actualizando = false;

    //public value: string = null;

    constructor(private modalService: NgbModal,
                public noticeCategoryService: NoticeCategoryService,
                public noticeService: NoticeService,
                private alertService: AlertService,
                private translate: TranslateService
    ) {
        this.translate.setDefaultLang(this.activeLang);
        this.loadingFull = true;
    }

    ngOnInit(): void {
        this.cargarTodasLasNoticias();
        this.noticeCategoryService.getAll()
            .pipe(first())
            .subscribe(categorys => {
                    this.categorias = categorys;
                    console.log('categorys: ', categorys);
                    this.model.categoriaNoticia = categorys[0];
                    this.loading = false;
                    this.loadingFull = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    noticeState = new NoticeStateModel(1, '1', 'Aprobado', '', true, '');
    noticeCategory = new NoticeCategoryModel(1, '5e932f70edc85840601546c5', 'Noticias', '', true, '');
    persona = new PersonModel(1, '1', 'YSUAREZ', '', true, '6803296');
    //#region MODELOS
    model = new NoticeModel(18,
        '18',
        'Noticia IQ _ 18',
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
        '1080931527');

    newNotice() {
        this.model = new NoticeModel(18,
            '18',
            'Noticia IQ _ 18',
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
            '1080931527');
    }

    //#endregion

    rteCreated(): void {
        //console.log('this.rteEle.element.focus();');
        //this.rteEle.element.focus();
    }

    onSubmit(): void {
        this.loadingFull = true;
        this.model.descripcion = this.value;
        console.log('this.model:', this.model);
        if (this.actualizando) {
            this.noticeService.update(this.model)
                .pipe(first())
                .subscribe(() => {
                    this.submitted = true;
                    this.loadingFull = false;
                });
        } else {
            this.noticeService.create(this.model)
                .pipe(first())
                .subscribe(() => {
                    this.submitted = true;
                    this.loadingFull = false;
                });
        }
    }

    eliminarNoticia(id: string) {
        this.noticeService.delete(id)
            .pipe(first())
            .subscribe(() => this.cargarTodasLasNoticias());
    }

    prepararEdicion(noticeModel: NoticeModel) {
        console.log('noticeModel:',  noticeModel)
        this.creandoNuevo = true;
        this.submitted = false;
        this.actualizando = true;
        this.value = noticeModel.descripcion;
        this.model.descripcion = this.value;
        this.model = noticeModel;
    }

    volverALaLista(): void {
        this.model = null;
        this.creandoNuevo = false;
        this.submitted = true;
        this.cargarTodasLasNoticias();
    }

    nuevaNoticia(): void {
        this.model = new NoticeModel(18,
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
            '1080931527');
        this.creandoNuevo = true;
        this.submitted = false;
        this.actualizando = false;
    }

    private cargarTodasLasNoticias() {
        this.noticeService.getAll()
            .pipe(first())
            .subscribe(noticias => this.noticias = noticias);
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
