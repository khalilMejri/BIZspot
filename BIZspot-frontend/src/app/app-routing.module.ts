import { AuthGuard } from "./services/auth-guard";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ProfileComponent } from "./profile/profile.component";
import { BusinessCreationComponent } from "./business-creation/business-creation.component";
import { LogoutGuard } from './services/logout-guard';
import { SearchComponent } from './search/search.component';
import { FeedComponent } from './feed/feed.component';
import { BusinessDetailsComponent } from './business-details/business-details.component';
import { BusinessComponent } from './business/business.component';
import { SubscriptionsListComponent } from './subscriptions-list/subscriptions-list.component';

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "login", component: LoginComponent, canActivate: [LogoutGuard] },
  { path: "signup", component: SignupComponent, canActivate: [LogoutGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "search", component: SearchComponent, canActivate: [AuthGuard] },
  { path: "feed", component: FeedComponent, canActivate: [AuthGuard] },
  { path: "subs", component: SubscriptionsListComponent, canActivate: [AuthGuard] },
  { path: "business/:id", component: BusinessDetailsComponent, canActivate: [AuthGuard] },
  { path: "biz", component: BusinessComponent },
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
