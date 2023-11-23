import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Musica from 'src/app/model/entities/Musica';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { MusicaService } from 'src/app/model/service/musica.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.page.html',
  styleUrls: ['./atualizar.page.scss'],
})
export class AtualizarPage implements OnInit {
  nome!: string;
  genero!: string;
  banda!: string;
  musica!: Musica;
  anoLancamento!: number;
  album!: string;
  indice!: number;
  edicao: boolean = true;
  public imagem : any;


  constructor (private alertController: AlertController,
    private router: Router,
    private firebase: FirebaseService) { }

  ngOnInit() {
    this.musica = history.state.musica;
    this.nome = this.musica.nome;
    this.banda = this.musica.banda;
    this.anoLancamento = this.musica.anoLancamento;
    this.album = this.musica.album;
    this.genero = this.musica.genero;
  }

  habilitar(){
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  public uploadFile(imagem : any) {
    this.imagem = imagem.files;
  }


  editar(){
    let novo: Musica = new Musica(this.nome, this.banda, this.anoLancamento, this.genero, this.album);
    novo.id = this.musica.id;
    if(this.imagem){
      this.firebase.uploadImage(this.imagem, novo);
    }else{  
      this.firebase.update(novo, this.musica.id);
    }
    this.router.navigate(["/home"]);
  }

  excluir(){
    this.presentConfirmAlert("Playlist de Músicas", "Atenção", "Você deseja realmente excluir essa música?")
    }
    excluirContato(){
    this.firebase.delete(this.musica);
    this.router.navigate(['/home']);
    }
    async presentConfirmAlert(titulo : string, subtitulo: string, msg : string)
   {
      const alert = await this.alertController.create({
          header: titulo,
          subHeader: subtitulo,
          message: msg,
          buttons: [
            {text: 'Cancelar',
            role: 'cancelar',
            handler: ()=>{console.log("cancelou")}},
          {
            text: 'Confirmar',
            role: 'confirmar',
            handler:(acao) =>{
              this.excluirContato();
            }
          }
        ],
      })
        await alert.present();
    }
}