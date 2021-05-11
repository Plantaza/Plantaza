import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SwipeComponent } from './components/swipe/swipe.component';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './components/settings/settings.component';
import { OgrodjeComponent } from './components/ogrodje/ogrodje.component';
import { KategorijeComponent } from './components/kategorije/kategorije.component';
import { PrikazKategorijeComponent } from './components/prikaz-kategorije/prikaz-kategorije.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { PodrobnostiRastlineComponent } from './components/podrobnosti-rastline/podrobnosti-rastline.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SwipeComponent,
    AddPlantComponent,
    FirstPageComponent,
    SettingsComponent,
    OgrodjeComponent,
    KategorijeComponent,
    PrikazKategorijeComponent,
    PodrobnostiRastlineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
