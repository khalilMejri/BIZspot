import { AuthGuard } from "./services/auth-guard";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ProfileComponent } from "./profile/profile.component";
import { BusinessCreationComponent } from "./business-creation/business-creation.component";
import { LogoutGuard } from './services/logout-guard';

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "login", component: LoginComponent, canActivate: [LogoutGuard] },
  { path: "signup", component: SignupComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "create",
    component: BusinessCreationComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
