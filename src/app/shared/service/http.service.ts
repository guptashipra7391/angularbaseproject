import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers'
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AlertService } from './alert.service'

const serverName =   ''
@Injectable()
export class HttpService implements OnInit {
  url: string;
  accessToken1: Observable<any>;
  accessToken:string;
  promise:Promise<any>
  constructor(private httpService: Http, private store: Store<fromApp.AppState>,private alert:AlertService) {
    this.accessToken1 = this.store.select('auth');
    this.accessToken1.subscribe((data)=>{
      this.accessToken="JWT "+data.token;
    })
  }
 
  ngOnInit() {
   
  }
  parseServerError(error): string {
    try {
      error =error.json();
      let message=error.message||"Backend Server Error"
      return message;
    } catch (e) {
      return "Undefined error";
    }
  }
  handleError=   (error: any): Observable<any>=> {
    try{
     
      // for demo purposes only
       switch (error.status) {
         case 400:
         case 401:
           let erromsg: string = this.parseServerError(error);
           this.alert.showErrorMessage(erromsg)
           return Observable.throw(erromsg);
           
         case 404:
         case 500:
         this.alert.showErrorMessage("Server error")
         return Observable.throw("Server error");
           
   
         default:
         erromsg= this.parseServerError(error);
         this.alert.showErrorMessage(erromsg)
         return Observable.throw(error.message || erromsg);
       }
    }catch (e) {
    
      return Observable.throw(e);
    }
   
    
  }
  //Get//////////////////////////////////////////////////
  get(apiName: String,isAuth?: any, params?: any,loader?): Observable<any> {
    this.url = serverName + apiName;
  
   
    //This code will add access token
    let header = new Headers();
    header.append('Content-Type', 'application/json')
    if (isAuth) {
      
        header.append('Authorization',  this.accessToken)
     
    }
    let options = new RequestOptions({ headers: header });
    //handle parameters
    if (params) {
      let paramsToBePassed: URLSearchParams = new URLSearchParams();
      for (let p in params) {
        paramsToBePassed.set(p, params[p]);
      }

      options.search = params;
    }

    // Create a request option
    return this.httpService.get(this.url, options)
      // ...and calling .json() on the response to return data
      .map((res: Response) => {
      
        return res.json()
      }

      )
      
      //...errors if any
      .catch(this.handleError);
  }
  ////////////////////////End Get////////////////////////////////////////////////////

  //Post/////////////////////////////////////////////////////////////////////////////
  post(apiName: String, isAuth?: any, body?: any,loader?): Observable<any> {
    this.url = serverName + apiName;
    let bodyString = JSON.stringify(body); // Stringify payload
    
    let header = new Headers();
    header.append('Content-Type', 'application/json')
    //This code will add access token
    if (isAuth) {
      
        header.append('Authorization',  this.accessToken)
     
    }
    let options = new RequestOptions({ headers: header });
    return this.httpService.post(this.url, body , options) // ...using post request
      .map(
      //
      (res) => {
      
        return res.json()
      }

      ) // ...and calling .json() on the response to return data
      .catch(
      this.handleError
      );//...errors if any


  }
  /////////////////////////END POST////////////////////////////////////////////////////

  //Put////////////////////////////////////////////////////////////////////////////////
  put(apiName: String, isAuth?: any, body?: any,loader?): Observable<any> {
    this.url = serverName + apiName;
    let bodyString = JSON.stringify(body); // Stringify payload
    //This code will add access token
  
    
    let header = new Headers();
    header.append('Content-Type', 'application/json')
    if (isAuth) {
      
        header.append('Authorization',  this.accessToken)
     
    }
    let options = new RequestOptions({ headers: header });
    return this.httpService.put(this.url, body, options) // ...using post request
      .map((res: Response) => {
       
        return res.json()

      }
      ) // ...and calling .json() on the response to return data
      .catch(this.handleError); //...errors if any
  }
  ///////////////////////////////////END PUT////////////////////////////////////////////


  //Delete/////////////////////////////////////////////////////////////////////////////
  delete(apiName: String, params?,loader?): Observable<any> {


    this.url = serverName + apiName;
   

    //This code will add access token
   
    
    let header = new Headers();
    header.append('Content-Type', 'application/json')
    header.append('Authorization',  this.accessToken)
     
   
    let options = new RequestOptions({ headers: header });
    //handle parameters
    if (params) {
      let paramsToBePassed: URLSearchParams = new URLSearchParams();
      for (let p in params) {
        paramsToBePassed.set(p, params[p]);
      }

      options.search = params;
    }



    // Create a request option
    return this.httpService.delete(this.url, options)
      // ...and calling .json() on the response to return data
      .map(
      (res: Response) => {
      
        return res.json()
      }
      )
      //...errors if any
      .catch(this.handleError);

    //////////////////////////////End Delete/////////////////////////////////////////
  }
}