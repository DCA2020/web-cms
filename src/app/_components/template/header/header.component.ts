import {Component, OnInit} from '@angular/core';
import {ToastService} from "@/_services/toast.service";
import {Log} from "@/_utils";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    myLogger = new Log();

    constructor(public toastService: ToastService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.actualizaReloj();
    }

    cargarContenido(dangerTpl, contents: string): void {
        this.myLogger.info('dangerTpl:', dangerTpl);
        this.router.navigate([contents]);
        this.toastService.show(dangerTpl, {classname: 'bg-success text-light', delay: 15000});
    }


    actualizaReloj(): void {
        /* Capturamos la Hora, los minutos y los segundos */
        let marcacion = new Date();
        /* Capturamos la Hora */
        let Hora = marcacion.getHours();
        /* Capturamos los Minutos */
        let Minutos = marcacion.getMinutes();
        /* Capturamos los Segundos */
        let Segundos = marcacion.getSeconds();
        /* Si la Hora, los Minutos o los Segundos
         Son Menores o igual a 9, le aniadimos un 0 */
        if (Hora <= 9) {
            Hora =  Hora;
        }
        if (Minutos <= 9) {
            Minutos =  Minutos;
        }
        if (Segundos <= 9) {
            Segundos =  Segundos;
        }
        /* Termina el Script del Reloj */
        /* Comienza el Script de la Fecha */
        var Dia = new Array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo");
        var Mes = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        var Hoy = new Date();
        var Anio = Hoy.getFullYear();
        var Fecha = "" + Dia[Hoy.getDay()] + ", " + Hoy.getDate() + " de " + Mes[Hoy.getMonth()] + " de " + Anio + ", ";
        /* Termina el script de la Fecha */
        /* Creamos 4 variables para darle formato a nuestro Script */
        var Inicio, Script, Final, Total;
        /*En Inicio le indicamos un color de fuente  y un size */
        Inicio = "<font>";
        /* En Reloj le indicamos la Hora, los Minutos y los Segundos */
        Script = Fecha + Hora + ":" + Minutos + ":" + Segundos;
        /* En final cerramos el tag de la fuente */
        Final = "</font>";
        /* En total Finalizamos el Reloj uniendo las variables */
        Total = Inicio + Script + Final;
        /* Capturamos una celda para mostrar el Reloj */
        document.getElementById('Fecha_Reloj').innerHTML = Total;
        /* Indicamos que nos refresque el Reloj cada 1 segundo */
        setTimeout(()=>{this.actualizaReloj(), 1000});
    }

}
