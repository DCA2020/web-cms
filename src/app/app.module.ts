import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {appRoutingModule} from './app.routing';
import {JwtInterceptor, ErrorInterceptor} from './_helpers';
import {AppServiceComponent} from './app.component';
import {HomeComponent} from './home';
import {RegisterComponent} from './register';
import {AlertComponent} from './_directives';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslationComponent} from "@/translation/translation.component";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {CalendarComponent} from './_components/calendar/calendar.component'
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SortPipe} from './pipes/sort.pipe';
import {ArticleComponent} from './_components/article/article.component'
import {RichTextEditorAllModule} from "@syncfusion/ej2-angular-richtexteditor";
import {NoticeComponent} from "@/_components/notice/notice.component";
import {BREAKPOINT, FlexLayoutModule} from "@angular/flex-layout";
import {
    StyleUtils,
    StylesheetMap,
    MediaMarshaller,
    ɵMatchMedia,
    BreakPointRegistry,
    PrintHook,
    LayoutStyleBuilder,
    FlexStyleBuilder,
    ShowHideStyleBuilder,
    FlexOrderStyleBuilder
} from "@angular/flex-layout";
import {NgxPaginationModule} from "ngx-pagination";
import {PaginationComponent} from "@/_directives/pagination/pagination.component";
import {DragDropFileUploadDirective} from './_directives/drag-drop-file-upload.directive';
import {NoticeDetailComponent} from './_components/notice/notice-detail/notice-detail.component';
import {NoticeCreateComponent} from './_components/notice/notice-create/notice-create.component';

;
import {ToastGlobalComponent} from './_directives/toast/toast-global/toast-global.component'
    ;
import {ToastsContainersComponent} from './_directives/toast/toasts-containers/toasts-containers.component'

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

const EXTRA_BREAKPOINTS = [{
    alias: 'xs.landscape',
    suffix: 'XsLandscape',
    mediaQuery: 'screen and (orientation: landscape) and (max-width: 559px)',
    priority: 1000,
    overlapping: false
}];

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        AngularFontAwesomeModule,
        appRoutingModule,
        NgbDatepickerModule,
        NgbModule,
        FormsModule,
        RichTextEditorAllModule,
        FlexLayoutModule.withConfig({
            useColumnBasisZero: false,
            printWithBreakpoints: ['md', 'lt-lg', 'lt-xl', 'gt-sm', 'gt-xs']
        }),
        NgxPaginationModule
    ],
    declarations: [
        AppServiceComponent,
        HomeComponent,
        RegisterComponent,
        AlertComponent,
        TranslationComponent,
        CalendarComponent,
        SortPipe,
        ArticleComponent,
        NoticeComponent,
        PaginationComponent,
        DragDropFileUploadDirective,
        NoticeDetailComponent,
        NoticeCreateComponent,
        ToastsContainersComponent,
        ToastGlobalComponent],
    exports: [PaginationComponent],
    providers:
        [
            {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
            {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
            StyleUtils, StylesheetMap, MediaMarshaller, ɵMatchMedia, BreakPointRegistry, PrintHook, LayoutStyleBuilder, FlexStyleBuilder, ShowHideStyleBuilder, FlexOrderStyleBuilder,
            {provide: BREAKPOINT, useValue: EXTRA_BREAKPOINTS, multi: true},
            PaginationComponent
        ],
    bootstrap: [AppServiceComponent]
})

export class AppModule {
};
