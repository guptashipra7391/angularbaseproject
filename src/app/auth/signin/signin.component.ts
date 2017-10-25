import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpService} from '../../shared/service/http.service';
import { AccessTokenService} from '../../shared/service/access-token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public user={
    emailOrPhone:"",
    password:""
  }
  response:any;
  body:any;
  constructor(private http:HttpService,private ats :AccessTokenService,private router:Router) { }

  ngOnInit() {
  }
  onSignin():void{
    console.log(this.user)
    this.http.post('login',false,this.user).subscribe(
      res=>{
        this.response=res.json();
        this.body=this.response
        
        //Update access Token 
        this.ats.updateAccessToken(this.body.accessToken)
        this.router.navigate(['/test']);
      } 
    )
   
  }

}
