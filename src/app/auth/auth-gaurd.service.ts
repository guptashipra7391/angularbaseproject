import { Injectable } from '@angular/core';
import {  CanActivate,
          RouterStateSnapshot,
          ActivatedRouteSnapshot,
          Router } from '@angular/router';
import {Observable} from 'rxjs';
import {AccessTokenService} from '../shared/service/access-token.service'

@Injectable()
export class AuthGaurd implements CanActivate{

  constructor(private at:AccessTokenService,private router:Router) { }
  canActivate(state:ActivatedRouteSnapshot,route:RouterStateSnapshot):Observable<boolean> | Promise<boolean> |boolean{
            localStorage.setItem("lastRequested",route.url)
               return this.at.isUserAuthenticated().then(
                  (authenticated:boolean)=>{
                    if(authenticated){
                      return true;
                    }else{
                      this.router.navigate(['/auth/signIn'])
                    }
                  }
                )


  }

}
