import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { AuthRoutingModule} from '../auth/auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent
  ],
 
})
export class AuthModule { }
