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

  read(uid: string){
    return this.firestore.collection(this.PATH, ref => ref.where('uid', '==', uid))
    .snapshotChanges();
  }

  createWithImage(musica: Musica){
    return this.firestore.collection(this.PATH)
    .add({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero, downloadURL : musica.downloadURL, uid: musica.uid});
  }

  createWithSound(musica: Musica){
    return this.firestore.collection(this.PATH)
    .add({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero, downloadMusica : musica.downloadMusica, uid: musica.uid});
  }

  createWithImageAndSound(musica: Musica){
    return this.firestore.collection(this.PATH)
    .add({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero, downloadURL : musica.downloadURL, downloadMusica : musica.downloadMusica, uid: musica.uid});
  }

  create(musica: Musica){
    return this.firestore.collection(this.PATH)
    .add({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero, uid: musica.uid});
  }

  update(musica: Musica, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero, uid: musica.uid});
  }

  updateWithImage(musica: Musica, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero, downloadURL : musica.downloadURL, uid: musica.uid});
  }

  updateWithSound(musica: Musica, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero, downloadMusica : musica.downloadMusica, uid: musica.uid});
  }

  updateWithImageAndSound(musica: Musica, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: musica.nome, banda: musica.banda, anoLancamento: musica.anoLancamento, album: musica.album, genero: musica.genero, downloadURL : musica.downloadURL, downloadMusica : musica.downloadMusica, uid: musica.uid});
  }

  delete(musica: Musica){
    return this.firestore.collection(this.PATH).doc(musica.id).delete()
  }

  uploadImage(imagem: any, musica: Musica){
    const imageFile = imagem.item(0);
    if(imageFile.type.split('/')[0] !== 'image'){
      console.error('Tipo Não Suportado');
      return;
    }
    const imagePath = `images/${musica.id}_${imageFile.name}`;
    const imageFileRef = this.storage.ref(imagePath);
    let task = this.storage.upload(imagePath,imageFile);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadedFileURL = imageFileRef.getDownloadURL();
        uploadedFileURL.subscribe(resp=>{
          musica.downloadURL = resp;
          if(!musica.id){
            this.createWithImage(musica);
          }else{
            this.updateWithImage(musica, musica.id);
          }
        })
       })).subscribe();

  }

  uploadImageWithSound(imagem: any, som: any, musica: Musica) {
    // Upload da imagem
    const imageFile = imagem.item(0);
    if (imageFile.type.split('/')[0] !== 'image') {
      console.error('Tipo de imagem não suportado!');
      return;
    }
    const imagePath = `images/${musica.id}_${imageFile.name}`;
    const imageFileRef = this.storage.ref(imagePath);
  
    // Upload do som
    const soundFile = som.item(0);
    if (soundFile.type.split('/')[0] !== 'audio') {
      console.error('Tipo de som não suportado!');
      return;
    }
    const soundPath = `sound/${musica.id}_${soundFile.name}`;
    const soundFileRef = this.storage.ref(soundPath);
  
    // Iniciar as tarefas de upload para imagem e som simultaneamente
    const imageUploadTask = this.storage.upload(imagePath, imageFile);
    const soundUploadTask = this.storage.upload(soundPath, soundFile);
  
    // Observar as mudanças de snapshot para imagem
    imageUploadTask.snapshotChanges().pipe(
      finalize(() => {
        const imageDownloadURL = imageFileRef.getDownloadURL();
        imageDownloadURL.subscribe((imageResp) => {
          // Atualizar a URL da imagem na propriedade da música
          musica.downloadURL = imageResp;
  
          // Observar as mudanças de snapshot para o som
          soundUploadTask.snapshotChanges().pipe(
            finalize(() => {
              const soundDownloadURL = soundFileRef.getDownloadURL();
              soundDownloadURL.subscribe((soundResp) => {
                // Atualizar a URL do som na propriedade da música
                musica.downloadMusica = soundResp;
  
                // Criar ou atualizar a música com as URLs da imagem e do som
                if (!musica.id) {
                  this.createWithImageAndSound(musica);
                } else {
                  this.updateWithImageAndSound(musica, musica.id);
                }
              });
            })
          ).subscribe();
        });
      })
    ).subscribe();
  }

  getAudioURL(audioURL: string) {
    const audioRef = this.storage.refFromURL(audioURL);
    return audioRef.getDownloadURL();
  }
  
}






















