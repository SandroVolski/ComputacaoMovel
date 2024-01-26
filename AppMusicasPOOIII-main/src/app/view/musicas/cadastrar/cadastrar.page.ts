import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Musica from 'src/app/model/entities/Musica';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { MusicaService } from 'src/app/model/service/musica.service';
import { AuthService } from 'src/app/model/service/auth.service';
import { AlertService } from 'src/app/common/alert.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';

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
  formCadastrar : FormGroup;

  constructor(private alert : AlertService, private alertController: AlertController,
    private router : Router,
    private firebase: FirebaseService,
    private auth: AuthService, private formBuilder : FormBuilder)  { 
      this.user = this.auth.getUserLogged();
      this.formCadastrar = new FormGroup({
        nome : new FormControl(''),
        banda : new FormControl(''),
        anoLancamento : new FormControl(''),
        album : new FormControl(''),
        genero : new FormControl(''),
      });
    }

  ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      nome : ['', [Validators.required]],
      banda : ['', [Validators.required]],
      anoLancamento : ['', [Validators.required, Validators.max(2024), Validators.min(1500)]],
      album : ['', [Validators.required]],
      genero : ['', [Validators.required]],
    });
  } 

  get errorControl(){
    return this.formCadastrar.controls;
  }

  public uploadFile(imagem : any) {
    this.imagem = imagem.files;
  }

  public uploadSound(som : any) {
    this.som = som.files;
  }

  submitForm() : boolean{
    if (!this.formCadastrar.valid) {
      this.alert.presentAlert('Erro', 'Erro ao Preencher!');
      return false;
    } else {
      this.alert.simpleLoader();
      this.cadastrar();
      return true;
    }
  }

  cadastrar(){
    const { nome, banda, anoLancamento, genero, album } = this.formCadastrar.value;
    if(nome && banda && anoLancamento && genero && album){
      let novo : Musica = new Musica(nome, banda, anoLancamento, genero, album);
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