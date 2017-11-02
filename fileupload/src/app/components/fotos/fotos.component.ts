import { Component } from '@angular/core';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html'
})
export class FotosComponent {

  imagenes:any;

  constructor(public _cargaImagenes:CargaImagenesService) {
    this.imagenes = _cargaImagenes.listaUltimasImagenes(10);
  }

}
