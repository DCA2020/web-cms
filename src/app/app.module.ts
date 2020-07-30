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
import {ToastGlobalComponent} from './_directives/toast/toast-global/toast-global.component';
import {ToastsContainersComponent} from './_directives/toast/toasts-containers/toasts-containers.component';
import {TemplateComponent} from './_components/template/template.component';
import {HeaderComponent} from './_components/template/header/header.component';
import {FooterComponent} from './_components/template/footer/footer.component';
import {BodyComponent} from './_components/template/body/body.component';
import {CopyrightComponent} from './_components/template/footer/copyright/copyright.component';
import {AboutUsComponent} from './_components/template/body/about-us/about-us.component';
import {ServiceComponent} from './_components/template/body/service/service.component';
import {ContactComponent} from './_components/template/body/contact/contact.component';
import {TestimonialComponent} from './_components/template/body/testimonial/testimonial.component';
import {LinkExternalComponent} from './_components/template/body/link-external/link-external.component';
import {LinkComponent} from './_components/template/body/link/link.component';
import {LinkLeftComponent} from './_components/template/body/link-left/link-left.component';
import {InstagramComponent} from './_components/template/content/instagram/instagram.component';
import {ContentComponent} from './_components/template/content/content.component';
import {LoginComponent} from './_components/login/login.component';
import {RegisterCommunityComponent} from './_components/register-community/register-community.component';
import {LinkRightComponent} from "@/_components/template/body/link-right/link-right.component";

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
        ToastGlobalComponent,
        TemplateComponent,
        FooterComponent,
        HeaderComponent,
        BodyComponent,
        CopyrightComponent,
        AboutUsComponent,
        ServiceComponent,
        ContactComponent,
        TestimonialComponent,
        LinkExternalComponent,
        LinkComponent,
        LinkLeftComponent,
        LinkRightComponent,
        InstagramComponent,
        ContentComponent,
        LoginComponent,
        RegisterCommunityComponent],
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
