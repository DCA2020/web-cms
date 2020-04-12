import {Component, OnInit, ViewChild} from '@angular/core';
import {NoticeModel} from "@/_models/";
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

@Component({
    selector: 'app-notice',
    templateUrl: './notice.component.html'
})
export class NoticeComponent implements OnInit {
    @ViewChild('fromRTE', null)
    private rteEle: RichTextEditorComponent;
    public tools: object = {
        items: [
            'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
            'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
            'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
            'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
    };

    public value: string = `
    <p>The RichTextEditor triggers events based on its actions. </p>
      <p> The events can be used as an extension point to perform custom operations.</p>`


    //public value: string = null;

    constructor() {
    }

    ngOnInit(): void {

    }

    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];

    noticeState = new NoticeStateModel(1, '1', 'Aprobado', '', true, '');
    noticeCategory = new NoticeCategoryModel(1, '1', 'Noticias', '', true, '');
    persona = new PersonModel(1, '1', 'YSUAREZ', '', true, '6803296');
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

    submitted = false;

    newHero() {
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


    rteCreated(): void {
        this.rteEle.element.focus();
    }

    onSubmit(form: NgForm): void {
        alert(form.value);
        this.submitted = true;
    }
}
