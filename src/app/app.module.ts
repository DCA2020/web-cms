import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
// used to create fake backend
import {fakeBackendProvider} from './_helpers';
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
import {FlexLayoutModule} from "@angular/flex-layout";
import {NoticeComponent} from "@/_components/notice/notice.component";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
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
        // FlexLayoutModule
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
        NoticeComponent],
    providers:
        [
            {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
            {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
            // provider used to create fake backend
            fakeBackendProvider],
    bootstrap: [AppServiceComponent]
})

export class AppModule {
};
