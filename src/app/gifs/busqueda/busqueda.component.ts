import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent{

  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsServices:GifsService){}

  buscar(termino:string){

    //console.log("object",this.txtBuscar)
    const valor=this.txtBuscar.nativeElement.value
    this.gifsServices.buscarGifs(valor)
    this.txtBuscar.nativeElement.value=""
  }
}
