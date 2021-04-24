import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlantComponent } from './add-plant/add-plant.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SwipeComponent } from './swipe/swipe.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
