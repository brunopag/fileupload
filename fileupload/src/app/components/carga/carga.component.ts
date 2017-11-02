import { Component } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html'
})
export class CargaComponent {

  estaSobreDropZone:boolean = false;
  permiteCargar:boolean = true;

  archivos:FileItem[] = [];

  constructor(public _cargaImagenes:CargaImagenesService) { }

  archivoSobreDropzone(e:boolean){
    this.estaSobreDropZone = e;
  }

  cargarFirebase(){
    this.permiteCargar = false;
    this._cargaImagenes.cargarImagenesAFirebase(this.archivos);
  }

  limpiarArchivos(){
    this.archivos = [];
    this.permiteCargar = true;
  }

}
