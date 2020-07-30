import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home';
import {AuthGuard} from "@/_guards/auth.guard";
import {NoticeComponent} from "@/_components/notice/notice.component";
import {NoticeDetailComponent} from "@/_components/notice/notice-detail/notice-detail.component";
import {NoticeCreateComponent} from "@/_components/notice/notice-create/notice-create.component";
import {InstagramComponent} from "@/_components/template/content/instagram/instagram.component";
import {ContentComponent} from "@/_components/template/content/content.component";
import {LoginComponent} from "@/_components/login/login.component";
import {RegisterCommunityComponent} from "@/_components/register-community/register-community.component";

const routes: Routes = [
    {path: '', component: ContentComponent}, // , canActivate: [AuthGuard]},
    {path: 'app-content', component: ContentComponent}, // , canActivate: [AuthGuard]},
    {path: 'app-login', component: LoginComponent}, // , canActivate: [AuthGuard]},
    {path: 'app-register-community', component: RegisterCommunityComponent}, // , canActivate: [AuthGuard]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'app-login', component: LoginComponent},
    {path: 'app-notices', component: NoticeComponent}, // canActivate: [AuthGuard]},
    {path: 'app-notice-detail', component: NoticeDetailComponent}, // canActivate: [AuthGuard]},
    {path: 'app-notice-create', component: NoticeCreateComponent}, // canActivate: [AuthGuard]},
    {path: 'app-instagram', component: InstagramComponent}, // canActivate: [AuthGuard]},
    /*{path: 'articles', component: NoticeComponent, canActivate: [AuthGuard]},*/
    /*{path: 'contentsHTML', component: NoticeComponent, canActivate: [AuthGuard]},*/
    {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
