import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { KategorijeComponent } from './components/kategorije/kategorije.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SwipeComponent } from './components/swipe/swipe.component';
import {PrikazKategorijeComponent} from './components/prikaz-kategorije/prikaz-kategorije.component';
import {PodrobnostiRastlineComponent} from "./components/podrobnosti-rastline/podrobnosti-rastline.component";
import { AddOglasComponent } from './components/add-oglas/add-oglas.component';
import { NastavitveComponent } from './components/nastavitve/nastavitve.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { SeznamKlepetovComponent } from './components/seznam-klepetov/seznam-klepetov.component';
import { KlepetComponent } from './components/klepet/klepet.component';
import {SprejeteComponent} from "./components/sprejete/sprejete.component";

const routes: Routes = [
  {
    path: '',
    component: FirstPageComponent
  },
  {
    path: 'nastavitve',
    component: NastavitveComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'swipe',
    component: SwipeComponent
  },
  {
    path: 'plant/add',
    component: AddPlantComponent
  },
  {
    path: 'kategorije',
    component: KategorijeComponent
  },
  {
    path: 'kategorije/:kategorija',
    component: PrikazKategorijeComponent
  },
  {
    path: 'podrobnosti/:rastlina',
    component: PodrobnostiRastlineComponent
  },
  {
    path: 'oglas/add',
    component: AddOglasComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'sprejete',
    component: SprejeteComponent
  },
  {
    path: 'klepet',
    component: KlepetComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
