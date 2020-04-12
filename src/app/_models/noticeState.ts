export class NoticeStateModel {

    constructor(
        public id: number,
        public _id: string,
        public estado: string,
        public descripcion: string,
        public activo?: boolean,
        public token?: string
    ) {  }
}
