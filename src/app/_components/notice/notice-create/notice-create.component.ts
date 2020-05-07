import {Component, OnInit, ViewChild} from '@angular/core';
import {RichTextEditorComponent} from "@syncfusion/ej2-angular-richtexteditor";
import {NoticeCategoryModel, NoticeModel, NoticeStateModel} from "@/_models";
import {Log} from "@/_utils";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService, NoticeCategoryService, NoticeService} from "@/_services";
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";
import {DragdropService} from "@/_services/dragdrop-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {PersonModel} from "@/_models/person";

@Component({
    selector: 'app-notice-create',
    templateUrl: './notice-create.component.html',
    styleUrls: ['./notice-create.component.css']
})
export class NoticeCreateComponent implements OnInit {

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
    model: NoticeModel;
    noticia: any;
    enEdicion: string = 'false';

    noticeState = new NoticeStateModel(1, '1', 'Aprobado', '', true, '');
    noticeCategory = new NoticeCategoryModel(1, '5e932f70edc85840601546c5', 'Noticias', '', true, '');
    persona = new PersonModel(1, '1', 'YSUAREZ', '', true, '6803296');
    //public value: string = null;

    constructor(private rutaActiva: ActivatedRoute,
                private modalService: NgbModal,
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
        this.enEdicion = this.rutaActiva.snapshot.paramMap.get('enEdicion');
        if (this.enEdicion === 'true') {
            this.noticia = this.noticeService.noticeInEditing;
            this.myLogger.info('this.noticia: ', {data: this.noticia, enEdicion: this.enEdicion})
            this.prepararEdicion(this.noticia);
        }

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

    prepararEdicion(noticeModel: NoticeModel) {
        console.log('noticeModel:', noticeModel)
        this.creandoNuevo = true;
        this.submitted = false;
        this.actualizando = true;
        this.value = noticeModel.descripcion;
        this.model = noticeModel;
        this.loadingFull = false;
    }

    rteCreated(): void {
        //console.log('this.rteEle.element.focus();');
        //this.rteEle.element.focus();
    }

    //#region MODELOS
    /*model = new NoticeModel(18,
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
        'coronavirusmedicina.jpg',
        '',
        true,
        '1080931527');*/

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
                    this.router.navigate(['/app-notice-detail']);
                });
        } else {
            this.noticeService.create(this.model)
                .pipe(first())
                .subscribe(() => {
                    this.submitted = true;
                    this.loadingFull = false;
                    this.router.navigate(['/app-notice-detail']);
                });
        }
    }

    volverALaLista(): void {
        //this.model = null;
        this.creandoNuevo = false;
        this.submitted = true;
        this.router.navigate(['/notices']);
    }

    upload(e) {
        const fileListAsArray = Array.from(e);
        fileListAsArray.forEach((item, i) => {
            const file = (e as HTMLInputElement);
            const url = URL.createObjectURL(file[i]);
            this.imgArr.push(url);
            this.fileArr.push({item, url: url});
        })

        this.fileArr.forEach((item) => {
            this.fileObj.push(item.item)
        })

        // Set files form control
        this.form.patchValue({
            avatar: this.fileObj
        })

        this.form.get('avatar').updateValueAndValidity()

        // Upload to server
        this.dragdropService.addFiles(this.form.value.avatar)
            .subscribe((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log('Request has been made!');
                        break;
                    case HttpEventType.ResponseHeader:
                        console.log('Response header has been received!');
                        break;
                    case HttpEventType.UploadProgress:
                        this.progress = Math.round(event.loaded / event.total * 100);
                        console.log(`Uploaded! ${this.progress}%`);
                        break;
                    case HttpEventType.Response:
                        console.log('File uploaded successfully!', event.body);
                        setTimeout(() => {
                            this.progress = 0;
                            this.fileArr = [];
                            this.fileObj = [];
                            this.msg = "File uploaded successfully!"
                        }, 3000);
                }
            })
    }
}
