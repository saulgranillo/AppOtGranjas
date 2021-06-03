import { Injectable, Component } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource, CameraOptions } from '@capacitor/core';
import { Platform, IonicModule } from '@ionic/angular';
import { UsuarioService } from './usuario.service';
import {HttpClient, HttpHeaders, HttpParams} from'@angular/common/http';
const { Camera, Filesystem, Storage } = Plugins;
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  // Todo este codigo salió de la documentacion IONIC
  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  // tengo el proyecto de ejemplo es el de photo-gallery
  public photos: Photo[] = []; //la interfaz
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;
  public imagenes: any [] =[];
  public base:any;
  objImagen:CameraPhoto;
  public  window:any;

  constructor(platform: Platform, public http : HttpClient) {
    this.platform = platform;
  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 50 // highest quality (0 to 100)
    });

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });

    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });
  }

  public async selectFromGallery(){

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Photos, // automatically take a new photo with the camera
      quality: 50 // highest quality (0 to 100)
    });

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });

    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });
  }

  private async savePicture(cameraPhoto: CameraPhoto) {

    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
    // var base = base64Data
    // console.log('base en savePicture', base)
    this.base = base64Data;
    this.imagenes.push(savedFile.uri);

          //  {filepath : savedFile.uri;
          //   webviewPath: Capacitor.convertFileSrc(savedFile.uri)
          //  }

  }

  public async loadSaved() {
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
            path: photo.filepath,
            directory: FilesystemDirectory.Data
        });
        var path = photo.filepath
        console.log('el path en loadSaved',path)
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  deleteImage(){

    Storage.clear();
    this.photos.pop();


   }

   cargarXId(IdOrden){
     var model = {
       IdImagen : 0,
       Imagen : "",
       IdOT : IdOrden
     }

    let promise = new Promise((resolve, reject) =>{
      this.http.post(`${environment.urlApiOrdenesTrabajo}/OT/CargarImgXId`,model).toPromise().then(
        (res:any) =>{
          // console.log('el RES',res);
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;
   }

   public async rptImagen(imgBase){

  //   const fileName = new Date().getTime() + '.jpeg';
  //   const savedFile = await Filesystem.writeFile({
  //     path: fileName,
  //     data: imgBase,
  //     directory: FilesystemDirectory.Data
  //   });

  //     this.objImagen = {
  //     webPath : fileName
  //   }
  //   const base64Data = await this.readAsBase64(objImagen);
  //   // var base = base64Data
  //   // console.log('base en savePicture', base)
  //   // Use webPath to display the new image instead of base64 since it's
  //   // already loaded into memory
  //   return {
  //   filepath: fileName,
  //   webviewPath: savedFile.uri
  // };

   }


}

export interface Photo {
  filepath: string;
  webviewPath: string;
}
