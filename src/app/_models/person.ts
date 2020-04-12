export class PersonModel {

    constructor(
        public id: number,
        public _id: string,
        public nombreCompleto: string,
        public descripcion: string,
        public activo?: boolean,
        public token?: string
    ) {  }
}
