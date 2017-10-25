import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component'


const authRoutes: Routes = [
  {
    path: '', component: AuthComponent, children: [

      {
        path: 'signIn', component: SigninComponent
      },
      {
        path: 'signUp', component: SignupComponent
      }
    ]
  }

]

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]

})
export class AuthRoutingModule { }
