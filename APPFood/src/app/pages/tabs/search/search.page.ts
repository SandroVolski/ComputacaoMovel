import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild ('searchInput') sInput;

  allRestaurants : any [] = [];
  restaurants : any [] = [];
  query: any;
  isLoading : boolean = false;

  model: any = {
    icon: 'search-outline',
    title: 'Nenhum estabelecimento encontrado.'
  }
  
  constructor() { 
    setTimeout(()=>{this.sInput.setFocus()},500);
  }

  ngOnInit() {
    this.allRestaurants = [
      {
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
  }

  async onSearchChange(event){
    this.restaurants = [];
    this.query = event.detail.value.toLowerCase();

    if(this.query.length > 0){
      this.isLoading = true;
      setTimeout(async()=>{
        this.restaurants = await this.allRestaurants.filter((element: any) =>{
          return element.short_name.includes(this.query)
        })
        console.log(this.restaurants);
        this.isLoading = false;
      }, 3000);
    }
  }
}