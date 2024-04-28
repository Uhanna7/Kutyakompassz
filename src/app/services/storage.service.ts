import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage(file: File, path: string): Observable<string | null> {
    const filePath = `${path}/${new Date().getTime()}_${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = storageRef.put(file);

    return new Observable(observer => {
      uploadTask.snapshotChanges().subscribe(
        snapshot => {
          if (snapshot && snapshot.state === 'success') {
            storageRef.getDownloadURL().subscribe(
              downloadURL => {
                observer.next(downloadURL);
                observer.complete();
              },
              error => {
                console.error('Hiba az URL letöltésekor: ', error);
                observer.next(null);
                observer.complete();
              }
            );
          }
        },
        error => {
          console.error('Hiba a kép feltöltésekor: ', error);
          observer.next(null);
          observer.complete();
        }
      );
    });
  }
}
