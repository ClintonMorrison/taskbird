import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './base/button/button.component';
import { NavComponent } from './base/nav/nav.component';
import { ItemDetailComponent } from './item-detail/item-detail.component'; // <-- NgModel lives here


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ButtonComponent,
    NavComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
