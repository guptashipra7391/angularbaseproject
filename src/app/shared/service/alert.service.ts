import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

interface statusMessages{
  error:string,
  warning:string,
  success:string,
  type:number
}
@Injectable()
export class AlertService {
    status:statusMessages={
      error:null,
      warning:null,
      success:null,
      type:-1
    }
   //Declare subject
   messageChange= new Subject<statusMessages>()
   
   constructor()
   { }
 
   showErrorMessage(str){
     this.status.error=str;
     this.status.type=0
     this.messageChange.next(this.status)

     setTimeout(()=>{
      this.status.error=null;
      this.status.type=-1
      this.messageChange.next(this.status)
     },10000)
   }
   showSuccessMessage(str){
    this.status.success=str;
    this.status.type=1
    this.messageChange.next(this.status)

    setTimeout(()=>{
      this.status.success=str;
      this.status.type=-1
      this.messageChange.next(this.status)
     },10000)
  }
  showWarningMessage(str){
    this.status.warning=str;
    this.status.type=2
    this.messageChange.next(this.status)
    setTimeout(()=>{
      this.status.warning=str;
      this.status.type=-1;
      this.messageChange.next(this.status)
     },10000)
  }
 
}
