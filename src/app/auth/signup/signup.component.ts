import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpService} from '../../shared/service/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user={
    name:"",
    emailOrPhone:"",
    password:""
  }
  response:any;
  body:any;
  constructor(private http:HttpService) { }

  ngOnInit() {
  }
  onSignup():void{
    console.log(this.user)
    this.http.post('register',false,this.user).subscribe(
      res=>{
        this.response=res.json();
        this.body=this.response
        console.log(this.body)
        
      } 
    )
   
  }
}
