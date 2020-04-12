export class NoticeCategoryModel {

    constructor(
        public id: number,
        public _id: string,
        public categoria: string,
        public descripcion: string,
        public activo?: boolean,
        public token?: string
    ) {  }
}
