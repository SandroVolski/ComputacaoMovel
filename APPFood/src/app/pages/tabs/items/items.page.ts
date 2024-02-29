import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences'

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  categories: any[] = [
    {
    id: "e00",
    name: "Italiana",
    uid: "playn"
    },
    {
    id: "e01",
    name: "Mexicana",
    uid: "playn"
    }
    ];

    allItems = [
      {
      category_id: "e00",
      cover: "assets/imgs/pizza.jpeg",
      desc: "Pizza de Calabreza",
      id: "i1",
      name: "Pizza",
      price: 80,
      rating: 0,
      status: true,
      uid: "playn",
      variation: false,
      veg: false
      },
      {
      category_id: "e00",
      cover: "assets/imgs/salada.jpeg",
      desc: "Salada Especial",
      id: "i2",
      name: "Salada",
      price: 40,
      rating: 0,
      status: true,
      uid: "playn",
      variation: false,
      veg: true
      },
      {
      category_id: "e01",
      cover: "assets/imgs/carne.jpeg",
      desc: "Medalhão de Mignon",
      id: "i3",
      name: "Carne",
      price: 120,
      rating: 0,
      status: true,
      uid: "playn",
      variation: false,
      veg: false
      }
      ];

  restaurants = [
    {
    uid:'playn',
    cover: 'assets/imgs/img1.jpeg',
    name: 'Dom Henrique 1',
    address: 'rua Joao Fino - Guarapuava PR',
    short_name: 'domhenrique1',
    cuisines:[
    'Almoço',
    'Café',
    'Hamburguer'
    ],
    rating: 5,
    delivery_time: 25,
    distance: 2.5,
    price: 100
    },
    {
      uid:'reidoprensado',
    cover: 'assets/imgs/img2.jpeg',
    name: 'Dom Henrique 2',
    address: 'rua Joao Fino - Guarapuava PR',
    short_name: 'domhenrique2',
    cuisines:[
    'Almoço',
    'Café',
    'Hamburguer'
    ],
    rating: 5,
    delivery_time: 25,
    distance: 2.5,
    price: 100
    },
    {
      uid:'ru',
    cover: 'assets/imgs/img3.jpeg',
    name: 'Dom Henrique 3',
    address: 'rua Joao Fino - Guarapuava PR',
    short_name: 'domhenrique3',
    cuisines:[
    'Almoço',
    'Café',
    'Hamburguer'
    ],
    rating: 5,
    delivery_time: 25,
    distance: 2.5,
    price: 100
    },
  ];
  data: any = {};
  cartData: any = {};
  storeData: any = {};
  items: any[] = [];
  id : any;
  veg: boolean=false;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('restaurantId')){
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      this.getItems();
      console.log(this.id);
    })
  }

  async getItems(){
    this.data={};
    let data : any = this.restaurants.filter(x => x.uid === this.id);
    this.data= data[0];
    this.items = this.allItems.filter(x => x.uid === this.id);;
    this.categories = this.categories.filter(x => x.uid === this.id);
    this.cartData = {};
    this.storeData = {};
    let cart: any = await this.getCart();
    if(cart?.value){
      this.storeData = JSON.parse(cart.value);
      if(this.id == this.storeData.restaurant.uid && this.allItems.length > 0){
        this.allItems.forEach((element: any)=>{
          this.storeData.items.forEach(ele =>{
            if(element.id ! != ele.id) return;
            element.quantity = ele.quantity;
          })
        }
      )}
    }
    this.cartData.totalItem = this.storeData.totalItem;
    this.cartData.totalPrice = this.storeData.totalPrice;
  }

  quantityPlus(item, index){
    try{
      if(!this.items[index].quantity || this.items[index].quantity == 0){
        this.items[index].quantity = 1;
        this.calculate();
      }else {
        this.items[index].quantity += 1;
        this.calculate();
      }
    }
    catch(e){
      console.log(e);
    }
  }

  quantityMinus(item, index){
    if(this.items[index].quantity !== 0){
      this.items[index].quantity -= 1;
    } else {
      this.items[index].quantity = 0;
    }
    this.calculate();
  }

  calculate(){
    console.log(this.items);
    this.cartData.items = [];
    let item = this.items.filter(x => x.quantity > 0);
    this.cartData.items = item;
    console.log(this.cartData.items);
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    item.forEach(element => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice += (parseFloat(element.price)) * (parseFloat(element.quantity));
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    if(this.cartData.totalItem == 0){
      this.cartData.totalPrice = 0;
      this.cartData.totalItem = 0;
    }
    this.saveToCart();
  }

  async saveToCart(){
    try{
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cartData),
      });
    }catch(e) {
      console.log(e);
    }
  }

  async viewCart(){
    if(this.cartData.items && this.cartData.items.length > 0){
      await this.saveToCart();
    }
    this.router.navigate([this.router.url + '/cart']);
  }

  getCart(){
    return Preferences.get({key: 'cart'});
  }

  getCuisine(cuisine){
    return cuisine.join(', ');
  }

  vegOnly(event){
    this.items = [];
    if(event.detail.checked == true){
      this.items = this.allItems.filter(x => x.veg === true);
    }else{
      this.items = this.allItems;
    }
  }
}
