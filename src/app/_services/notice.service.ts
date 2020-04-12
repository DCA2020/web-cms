import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NoticeModel} from "../_models";

@Injectable({
    providedIn: 'root'
})
export class NoticeService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<NoticeModel[]>(`${config.apiUrl}/api/notices`);
    }

    create(noticeModel: NoticeModel) {
        return this.http.post(`${config.apiUrl}/api/notice`, noticeModel);
    }

    delete(id: string) {
        return this.http.delete(`${config.apiUrl}/api/notice/${id}`);
    }
}
