import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SwipeComponent } from './swipe/swipe.component';
import { AddPlantComponent } from './add-plant/add-plant.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { NastavitveComponent } from './nastavitve/nastavitve.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SwipeComponent,
    AddPlantComponent,
    FirstPageComponent,
    NastavitveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
