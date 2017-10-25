import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Effect, Actions } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import * as fromApp from '../../store/app.reducers'
import { HttpService } from '../../shared/service/http.service';
import { fromPromise } from 'rxjs/observable/fromPromise'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs';
import { AlertService } from '../../shared/service/alert.service'
@Injectable()
export class AuthEffects {

    body;
    response;
    MSInputMethodContext
    constructor(private http: HttpService, private action$: Actions, private store: Store<fromApp.AppState>, private router: Router, private alert: AlertService) { }

    //Registering the effect of forgot password
    @Effect({ dispatch: false })
    authForgotPass = this.action$.ofType(AuthActions.FORGOT_PASS)
        .map((action: AuthActions.ForgotPass) => {
            console.log(action)
            return action.payload;
        }).switchMap(
        (authData) => {
            return this.http.post('recoverPassword', false, authData).catch((error) => {
                return [
                    {
                        type: AuthActions.FAIL
                    }
                ]
            })
        }
        ).map(
        res => {
            if (res.code == 200) {
            if (res['data']['type'] == "1") {
                this.router.navigate(['/auth/forgotPass/2', res['data']['mobile']['number']])
            } else {
                this.router.navigate(['/auth/forgotPass/5'])
            }
        }else {
            this.alert.showErrorMessage(res.message)
        }
        }
        )

    //Registering the effect of verify otp
    @Effect({ dispatch: false })
    authVerifyOtp = this.action$.ofType(AuthActions.VERIFY_OTP)
        .map((action: AuthActions.VerifyOtp) => {
            console.log(action)
            return action.payload;
        }).switchMap(
        (authData) => {
            return this.http.post('verifyOtp', false, authData).catch((error) => {
                return [
                    {
                        type: AuthActions.FAIL
                    }
                ]
            })
        }
        ).map(
        res => {
            console.log(res);
            if (res.code == 200) {
                this.router.navigate(['/auth/forgotPass/3', res['data']['mobile']['number']])

            } else {
                this.alert.showErrorMessage(res.message)
            }

        }

        )
    //Registering the effect of verify mobile
    @Effect({ dispatch: false })
    authVerifyMobile = this.action$.ofType(AuthActions.VERIFY_MOBILE)
        .map((action: AuthActions.VerifyMobile) => {
            console.log(action)
            return action.payload;
        }).switchMap(
        (authData) => {
            return this.http.post('verifyOtp', false, authData)
        }
        ).catch((error) => {
            return [
                {
                    type: AuthActions.FAIL
                }
            ]
        }).map(
        res => {
            console.log(res);
            if (res.code == 200) {
                this.router.navigate(['/auth/congratulation', "final"])
            } else {
                this.alert.showErrorMessage(res.message)
            }
        }
        )
    //Registering the effect for reset pass
    @Effect({ dispatch: false })
    resetPass = this.action$.ofType(AuthActions.RESET_PASS)
        .map((action: AuthActions.ResetPass) => {
            console.log(action)
            return action.payload;
        }).switchMap(
        (authData) => {
            return this.http.post('resetPassword', false, authData).catch((error) => {
                return [
                    {
                        type: AuthActions.FAIL
                    }
                ]
            })
        }
        ).map(
        res => {
            if (res.code == 200) {
                this.router.navigate(['/auth/forgotPass/4'])
            } else {
                this.alert.showErrorMessage(res.message)
            }
        }
        )


    //Registering the effect of resend otp
    @Effect({ dispatch: false })
    authResendOtp = this.action$.ofType(AuthActions.RESEND_OTP)
        .map((action: AuthActions.ResendOtp) => {
            console.log(action)
            return action.payload;
        }).switchMap(
        (authData) => {
            return this.http.post('sendOtpMobile', false, authData).catch((error) => {
                return [
                    {
                        type: AuthActions.FAIL
                    }
                ]
            })
        }
        ).map(
        res => {
           if(res.code==200){
            console.log(res);
            // this.router.navigate(['/auth/forgotPass/3', res['data']['mobile']['number']])
            this.alert.showErrorMessage(res.message)
           }
            else {
                this.alert.showErrorMessage(res.message)
            }

        }
        )
    //Registering effects for starting signup
    @Effect()
    authSignup = this.action$.ofType(AuthActions.TRY_SIGNUP)
        .map((action: AuthActions.TrySignup) => {
            return action.payload;
        }).switchMap(
        (authData) => {
            return this.http.post('signUp', false, authData).catch((error) => {
                return [
                    {
                        type: AuthActions.FAIL
                    }
                ]
            }).map(
                (res) => {
                    let response = res
                    if (res.code == 200) {
                        if (response['data']['email']['id']) {
                            this.router.navigate(['/auth/congratulation', 'email', authData.email]);

                        } else {
                            //open verify mobile link
                            this.router.navigate(['/auth/signUp', true, authData.mobileNumber]);
                        }
                        return {
                            type: AuthActions.SIGNUP
                        }
                    } else {
                        this.alert.showErrorMessage(res.message)
                    }

                },
                err => {
                    this.alert.showErrorMessage(err['message']);
                }
                )
        }
        )

    //Registering effects for starting signin
    @Effect()
    authSignin = this.action$.ofType(AuthActions.TRY_SIGNIN)
        .map((action: AuthActions.TrySignin) => {
            return action.payload;
        }).switchMap(
        (authData) => {
            return this.http.post('login', false, authData).catch((error) => {
                Observable.empty()
                return [
                    {
                        type: AuthActions.FAIL
                    }
                ]
            }).mergeMap(
                res => {
                    let response = res
                    if (res.code == 200) {
                        localStorage.setItem("authToken", response.data['authToken']);

                        return [
                            {
                                type: AuthActions.SET_TOKEN,
                                payload: response.data['authToken']
                            }, {
                                type: AuthActions.GET_PROFILE
                            }]
                    } else {
                        switch (res.code) {

                            case 401:
                                this.router.navigate(['/auth/verify/email', authData.email])
                                break;
                            case 402:
                                this.router.navigate(['/auth/verify/mobile', authData.mobileNumber])
                                break;
                            default:
                                console.log(res)

                        }
                        return [
                            {
                                type: AuthActions.FAIL
                            }
                        ]
                    }
                }
                )
        }
        )

    //Registering the effect of Signin action
    @Effect({ dispatch: false })
    authAfterSignin = this.action$.ofType(AuthActions.SIGNIN)
        .do(() => {
            if (localStorage.getItem("lastRequested")) {
                this.router.navigateByUrl(localStorage.getItem("lastRequested"));
                localStorage.removeItem("lastRequested")
            } else {
                this.router.navigate(['/test']);
            }

        });


    

}