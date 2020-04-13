import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NoticeCategoryModel} from "../_models";

@Injectable({
    providedIn: 'root'
})
export class NoticeCategoryService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<NoticeCategoryModel[]>(`${config.apiUrl}/api/categoriaNoticia`);
    }

    create(noticeCategoryModel: NoticeCategoryModel) {
        return this.http.post(`${config.apiUrl}/api/categoriaNoticia`, noticeCategoryModel);
    }

    delete(id: string) {
        return this.http.delete(`${config.apiUrl}/api/categoriaNoticia/${id}`);
    }
}
