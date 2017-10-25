import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducers';
import { AlertService } from './shared/service/alert.service';
import { HttpService } from './shared/service/http.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  alertSubscription:Subscription
  title = 'Angular Base project';
  alertMessage=""
  public authenticated;
  

  showMessage(str){
    $(`#${str}-alert`).delay(200).alert();
  }
  hideMessage(){
    $(".myAlert").fadeOut('slow');
  }
 
  constructor(private store: Store<AppState>, private alertService:AlertService, private http: HttpService) {
  }

  ngOnInit() {
    

      this.alertSubscription=this.alertService.messageChange.subscribe((data)=>{
      switch(data.type){
        case 0:
          this.alertMessage=data.error
          this.showMessage('error');
          break
        case 1:
          this.alertMessage=data.success
          this.showMessage('success');
          break;
        case 2:
          this.alertMessage=data.warning
          this.showMessage('warning');
          break;
        case -1:
          this.alertMessage=""
          this.hideMessage()
      }
    })

  }
}