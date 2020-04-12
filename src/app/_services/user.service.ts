import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '@/_models';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<UserModel[]>(`${config.apiUrl}/api/usuario/1/true/true`);
    }

    create(user: UserModel) {
        return this.http.post(`${config.apiUrl}/api/usuario`, user);
    }

    delete(id: string) {
        return this.http.delete(`${config.apiUrl}/api/usuario/${id}`);
    }
}
