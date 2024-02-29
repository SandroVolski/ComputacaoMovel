import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { IonicModule } from '@ionic/angular';
import { LoadingRestaurantComponent } from './loading-restaurant/loading-restaurant.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { OrderComponent } from './order/order.component';
import { OrderLoaderComponent } from './order-loader/order-loader.component';
import { EmptyOrderComponent } from './empty-order/empty-order.component';



@NgModule({
  declarations: [RestaurantComponent, LoadingRestaurantComponent, EmptyScreenComponent, OrderComponent, OrderLoaderComponent, EmptyOrderComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [RestaurantComponent, LoadingRestaurantComponent, EmptyScreenComponent, OrderComponent, OrderLoaderComponent, EmptyOrderComponent]
})
export class ComponentsModule { }
