import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home';
import {AuthGuard} from "@/_guards/auth.guard";
import {NoticeComponent} from "@/_components/notice/notice.component";

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'notices', component: NoticeComponent, canActivate: [AuthGuard]},
    {path: 'articles', component: NoticeComponent, canActivate: [AuthGuard]},
    {path: 'contentsHTML', component: NoticeComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
