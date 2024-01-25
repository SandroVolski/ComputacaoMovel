import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Musica from 'src/app/model/entities/Musica';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { MusicaService } from 'src/app/model/service/musica.service';
import { AuthService } from 'src/app/model/service/auth.service';
import { AlertService } from 'src/app/common/alert.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public nome :string;
  public banda : string;
  public anoLancamento: number;
  public genero: string;
  public album: string;
  public imagem : any;
  public som : any;
  public user: any;

  constructor(private alert : AlertService, private alertController: AlertController,
    private router : Router,
    private firebase: FirebaseService,
    private auth: AuthService)  { 
      this.user = this.auth.getUserLogged();
    }

  ngOnInit() {
  } 

  public uploadFile(imagem : any) {
    this.imagem = imagem.files;
  }

  public uploadSound(som : any) {
    this.som = som.files;
  }

  cadastrar(){
    if(this.nome && this.banda && this.anoLancamento && this.genero && this.album){
      let novo : Musica = new Musica(this.nome, this.banda, this.anoLancamento, this.genero, this.album);
      novo.uid = this.user.uid;
      this.alert.dismissLoader();
      if (this.imagem && this.som) {
        this.firebase.uploadImageWithSound(this.imagem, this.som, novo);
      } else {
        this.firebase.create(novo).then(() =>{
          this.alert.simpleLoader();

        });
      }
      this.presentAlert("Sucesso", "Contato Salvo!"); 
      this.router.navigate(["/home"]);
    }else{
     this.presentAlert("Erro", "Campos Obrigatórios!");
    }
  }

  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Musicas',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}