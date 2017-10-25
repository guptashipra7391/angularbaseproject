import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpService} from './service/http.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  declarations: [],
  exports:[HttpModule,HttpClientModule],
  providers:[HttpService]
})
export class SharedModule { }
