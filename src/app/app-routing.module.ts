import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGaurd} from './auth/auth-gaurd.service';



const appRoutes: Routes = [
    
    {
        path: '', component: HomeComponent,pathMatch:'full'
    },
    {
        path:'auth', loadChildren:'./auth/auth.module#AuthModule'
    },
    {
        path:'profile', canActivate:[AuthGaurd] ,loadChildren:'./profile/profile.module#ProfileModule'
    },
    {
        path:'dashboard', loadChildren:'./dashboard/dashboard.module#DashboardModule'
    }

]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]

})
export class AppRoutingModule { }
