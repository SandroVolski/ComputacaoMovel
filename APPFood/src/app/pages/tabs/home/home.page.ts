import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  swiperModules = [IonicSlides];
  banners: any[] = [];
  restaurants: any[] = [];
  isLoading: boolean = false;
  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.banners = [
      {banner: 'assets/imgs/img1.jpeg'},
      {banner: 'assets/imgs/img2.jpeg'},
      {banner: 'assets/imgs/img3.jpeg'},
      ];
      
      this.restaurants = [
      {
        uid:'playn',
        cover: 'assets/imgs/img1.jpeg',
        name: 'Playn Burger',
        short_name: 'playnburger',
        cuisines:[
          'Lanches',
          'Bebidas',
          'Hamburguer',
          'Fritas'
        ],
        rating: 4.7,
        delivery_time: 40,
        distance: 3.2,
        price: 69.90
      },

      {
        uid:'reidoprensado',
        cover: 'assets/imgs/img2.jpeg',
        name: 'Rei do Prensado',
        short_name: 'reidoprensado',
        cuisines:[
          'Cachorro Quente',
          'Bebidas',
          'Lanches'
        ],
        rating: 4.5,
        delivery_time: 20,
        distance: 1.8,
        price: 19.90
      },

      {
        uid:'ru',
        cover: 'assets/imgs/img3.jpeg',
        name: 'Restaurante Universitário',
        short_name: 'ru',
        cuisines:[
          'Almoço',
          'Café',
          'Lanches'
        ],
        rating: 1.9,
        delivery_time: 55,
        distance: 1.2,
        price: 12.90
      },
      ];

      this.isLoading = false;
    }, 3000)
  }
}
