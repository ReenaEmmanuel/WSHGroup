import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddnewserviceComponent } from './service/addnewservice/addnewservice.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ServicelistComponent } from './service/servicelist/servicelist.component';
import { UserlistComponent } from './users/userlist/userlist.component';
import { ServiceproviderComponent } from './users/serviceprovider/serviceprovider.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component : LoginComponent },
  { path: "signup", component : SignupComponent },
  { path: "userlist", component : UserlistComponent, canActivate: [AuthGuard]  },
  { path: "serviceproviderlist", component : ServiceproviderComponent, canActivate: [AuthGuard]  },
  { path: "servicelist", component : ServicelistComponent, canActivate: [AuthGuard]  },
  { path: "addnewservice", component : AddnewserviceComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
