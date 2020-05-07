import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from './_services';
import './_styles/styles.less';
import {UserModel} from "@/_models";

@Component({
    selector: 'app-service',
    templateUrl: './app.component.html'
})
export class AppServiceComponent implements OnInit {
    currentUser: UserModel;
    loading = false;
    returnUrl: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        console.log('entro...');
    }

}
