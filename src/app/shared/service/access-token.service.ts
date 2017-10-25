import { Injectable } from '@angular/core';
import { HttpService} from './http.service'

@Injectable()
export class AccessTokenService {
  private accessToken="";
  constructor(private http:HttpService) { }

  getAccessToken():string{
    return this.accessToken;
  }

  updateAccessToken(at:string){
    this.accessToken=at;
    console.log("access token updated");
  }

  isUserAuthenticated():Promise<boolean>{
    let context=this;
    const promise=new Promise<any>(
     
      (resolve,reject)=>{
        let bool:boolean;
       
          if(context.accessToken){
            this.http.post('isTokenValid',true).subscribe(
              res=>{
                console.log();
                let response=res.json()
                if(response.statusCode=='200'){
                    bool=true;
                }else{
                  bool=false;
                }
                resolve(bool);
              }
            )
           
          }else{
            bool=false;
            resolve(bool);
          }
         
      
       
      }
    )
    return promise;
   
  }

}
