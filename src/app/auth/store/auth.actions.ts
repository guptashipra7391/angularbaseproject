import { Action } from '@ngrx/store';

export const TRY_SIGNUP="TRY_SIGNUP";
export const TRY_SIGNIN="TRY_SIGNIN";
export const SIGNUP="SIGNUP";
export const SIGNIN="SIGNIN";
export const LOGOUT="LOGOUT";
export const SET_TOKEN="SET_TOKEN";
export const FORGOT_PASS="FORGOT_PASS";
export const RESET_PASS="RESET_PASS";
export const VERIFY_OTP="VERIFY_OTP";
export const VERIFY_MOBILE="VERIFY_MOBILE";
export const RESEND_OTP="RESEND_OTP";
export const RESEND_EMAIL="RESEND_EMAIL";
export const GET_PROFILE="GET_PROFILE";
export const FAIL="FAIL"
export class TrySignup implements Action {
    readonly type=TRY_SIGNUP;
    constructor(public payload:{ name:string,
    email:string,
    mobileNumber:string,
    password:string,
    OtpNumber:number}){}
}
export class TrySignin implements Action {
    readonly type=TRY_SIGNIN;
    constructor(public payload:{ 
    email:string,
    mobileNumber:string,
    password:string}){}
}
export class Signup implements Action {
    readonly type=SIGNUP
}
export class Signin implements Action {
    readonly type=SIGNIN
}
export class Logout implements Action {
    readonly type=LOGOUT
}
export class Fail implements Action {
    readonly type=FAIL
}
export class SetToken implements Action {
    readonly type=SET_TOKEN;
    constructor(public payload:string){};
}
export class ForgotPass implements Action {
    readonly type=FORGOT_PASS;
    constructor(public payload:{
        email:string,
        mobileNumber:string
    }){};
}
export class ResetPass implements Action {
    readonly type=RESET_PASS;
    constructor(public payload:{
        email:string,
        mobile:string,
        token:string,
        otp:string,
        password:string
    }){};
}
export class VerifyOtp implements Action {
    readonly type=VERIFY_OTP;
    constructor(public payload:{
        mobileNumber:string,
        otp:string
    }){};
}
export class VerifyMobile implements Action {
    readonly type=VERIFY_MOBILE;
    constructor(public payload:{
        mobileNumber:string,
        otp:string
    }){};
}
export class ResendOtp implements Action {
    readonly type=RESEND_OTP;
    constructor(public payload:{
        mobileNumber:string
    }){};
}
export class ResendEmail implements Action {
    readonly type=RESEND_EMAIL;
    constructor(public payload:{
        email:string
    }){};
}
export class GetProfile implements Action {
    readonly type=GET_PROFILE;
}
export type AuthActionList=Signup|Signin|Logout|SetToken|Fail;