import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Musica from '../entities/Musica';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'musicas';

  constructor(private firestore : AngularFirestore, private storage : AngularFireStorage) { }

  read(){
    return this.firestore.collection(this.PATH)
    .snapshotChanges();
  }

  createWithImage(musica: Musica){
    return this.firestore.collection(this.PATH)
    .add({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero, downloadURL : musica.downloadURL});
  }

  create(musica: Musica){
    return this.firestore.collection(this.PATH)
    .add({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero});
  }

  update(musica: Musica, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero});
  }

  updateWithImage(musica: Musica, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero, downloadURL : musica.downloadURL});
  }

  delete(musica: Musica){
    return this.firestore.collection(this.PATH).doc(musica.id).delete()
  }

  uploadImage(imagem: any, musica: Musica){
    const file = imagem.item(0)
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo Não Suportado!')
      return;
    }
    const path = `images/${musica.id}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file)
    task.snapshotChanges().pipe(
    finalize(()=>{
      let uploadedFileURL = fileRef.getDownloadURL();
      uploadedFileURL.subscribe(resp=>{
        musica.downloadURL = resp;
        if(!musica.id){
          this.createWithImage(musica);
        }else{
          this.updateWithImage(musica, musica.id);
        }
      })
    })).subscribe()
    return task;
  }
}






















