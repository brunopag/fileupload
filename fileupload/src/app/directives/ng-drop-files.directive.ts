import { Directive, EventEmitter, ElementRef,
          HostListener, Input, Output } from '@angular/core';

import { FileItem } from '../models/file-item';

@Directive({
  selector: '[NgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos:FileItem[] = [];
  @Output() archivoSobre: EventEmitter<any> = new EventEmitter();

  constructor(public elemento:ElementRef) { }

  @HostListener('dragenter', ['$event'])
  public onDragEnter( event:any ){
    this.archivoSobre.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event:any ){
    this.archivoSobre.emit(false);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver( event:any ){

    let transferencia = this._getTransferencia(event);
    transferencia.dropEffect = 'copy';

    this._prevenirYdetener(event);

    this.archivoSobre.emit(true);
  }

  @HostListener('drop', ['$event'])
  public onDrop( event:any ){

    let transferencia = this._getTransferencia(event);

    if(!transferencia){
      return;
    }

    this._agregarArchivos(transferencia.files);

    this.archivoSobre.emit(false);

    this._prevenirYdetener(event);

  }

  private _getTransferencia(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _agregarArchivos(archivosLista:FileList){

    for (let propiedad in Object.getOwnPropertyNames(archivosLista)){
      let archTemporal = archivosLista[propiedad];
      if(this._archivoPuedeSerCargado(archTemporal)){
        let nuevoArchivo = new FileItem(archTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }

    console.log(this.archivos);

  }

  private _prevenirYdetener( event:any ){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDropeado( nombreArchivo:string ):boolean {
    for( let i in this.archivos ){
      let arch = this.archivos[i];

      if(arch.archivo.name === nombreArchivo){
        return true;
      }

      return false;
    }
  }

  private _esImagen( tipoImagen:string ){
    return ( tipoImagen == '' || tipoImagen == undefined ) ? false : tipoImagen.startsWith("image");
  }

  private _archivoPuedeSerCargado( archivo:File ){
    if(!this._archivoYaFueDropeado(archivo.name) && this._esImagen(archivo.type)){
      return true;
    }
    return false;
  }

}
