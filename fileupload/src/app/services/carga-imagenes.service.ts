import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FileItem } from '../models/file-item';
import * as firebase from "firebase";


@Injectable()
export class CargaImagenesService {

  private CARPETA_IMAGENES = "img";

  constructor( public db: AngularFireDatabase ) { }

  listaUltimasImagenes( numero:number ):Observable<any[]>{
    return this.db.list( "/" + this.CARPETA_IMAGENES, ref => ref.limitToLast(numero) ).valueChanges();
  }

  cargarImagenesAFirebase( archivos:FileItem[] ){
    console.log( archivos );

    let storageRef = firebase.storage().ref();

    for( let item of archivos){

      item.estaSubiendo = true;

      let uploadTask:firebase.storage.UploadTask =
            storageRef.child(this.CARPETA_IMAGENES + "/" + item.nombreArchivo).put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progreso = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes * 100),
        (error) => console.log("Error: ", error),
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.estaSubiendo = false;
          this.guardarImagen({ nombre:item.nombreArchivo, url:item.url });
        }

      )

    }

  }

  guardarImagen( imagen:any ){
    this.db.list( "/" + this.CARPETA_IMAGENES ).push( imagen );
  }

}
