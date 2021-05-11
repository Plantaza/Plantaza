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

const routes: Routes = [
  {
    path: '',
    component: FirstPageComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
