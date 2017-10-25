import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

import { SharedModule } from './shared/shared.module';
import {AuthGaurd} from './auth/auth-gaurd.service';
import {AccessTokenService} from './shared/service/access-token.service';

import {HttpService} from './shared/service/http.service'
import {AlertService} from './shared/service/alert.service'
import { environment } from './../environments/environment';
import { AppReducers } from './store/app.reducers';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot([ AuthEffects]),
    StoreRouterConnectingModule,
    !environment.production? StoreDevtoolsModule.instrument():[]
  ],
  providers:[HttpService,AccessTokenService,AuthGaurd,AlertService],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
