import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home';
import {AuthGuard} from "@/_guards/auth.guard";
import {NoticeComponent} from "@/_components/notice/notice.component";
import {NoticeDetailComponent} from "@/_components/notice/notice-detail/notice-detail.component";
import {NoticeCreateComponent} from "@/_components/notice/notice-create/notice-create.component";

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'notices', component: NoticeComponent, canActivate: [AuthGuard]},
    {path: 'app-notice-detail', component: NoticeDetailComponent, canActivate: [AuthGuard]},
    {path: 'app-notice-create', component: NoticeCreateComponent, canActivate: [AuthGuard]},
    /*{path: 'articles', component: NoticeComponent, canActivate: [AuthGuard]},*/
    /*{path: 'contentsHTML', component: NoticeComponent, canActivate: [AuthGuard]},*/
    {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
