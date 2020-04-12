import {NoticeStateModel} from "@/_models/noticeState";
import {NoticeCategoryModel} from "@/_models/noticeCategory";
import {PersonModel} from "@/_models/person";

export class NoticeModel {

    constructor(
        public id: number,
        public _id: string,
        public titulo: string,
        public resumen: string,
        public descripcion: string,
        public metatags: string,
        public estadoNoticia: NoticeStateModel,
        public categoriaNoticia: NoticeCategoryModel,
        public orden: string,
        public url: string,
        public visitas: number,
        public meGusta: number,
        public noMeGusta: number,
        public enPaginaPrincipal: boolean,
        /*public voto: {
            excelente: boolean,
            bueno: boolean,
            regular: boolean,
            malo: boolean
        },
        public fechaPublicacion: {
            dia: string,
            mes: string,
            ano: string
        },*/
        public personaRegistro: PersonModel,
        public fechaRegistro: Date,
        public personaCambio: PersonModel,
        public fechaCambio: Date,
        public imagenPrincipal: string,
        public imagenBanner: string,
        public activo?: boolean,
        public token?: string
    ) {
    }
}
