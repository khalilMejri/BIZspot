import { AuthInterceptor } from "./services/auth-interceptor";
import { UserService } from "./services/user.service";
import { AuthGuard } from "./services/auth-guard";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AppRoutingModule } from "./app-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BusinessCreationComponent } from "./business-creation/business-creation.component";
import { LogoutGuard } from "./services/logout-guard";
import { FeedComponent } from "./feed/feed.component";
import { SearchComponent } from "./search/search.component";
import { BusinessComponent } from "./business/business.component";
import { BusinessDetailsComponent } from "./business-details/business-details.component";
import { RatingComponent } from "./rating/rating.component";

import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionsListComponent } from './subscriptions-list/subscriptions-list.component';
import { ReviewComponent } from './review/review.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LostComponent } from './lost/lost.component';
import { NotificationComponent } from './notification/notification.component';
import { InfinityScrollComponent } from './infinity-scroll/infinity-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    BusinessCreationComponent,
    FeedComponent,
    SearchComponent,
    BusinessComponent,
    BusinessDetailsComponent,
    SubscriptionComponent,
    SubscriptionsListComponent,
    ReviewComponent,
    ReviewListComponent,
    NavbarComponent,
    RatingComponent,
    LostComponent,
    NotificationComponent,
    InfinityScrollComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBRCcgt6Ct94G_vxqMTDJZHmyPvePv0dHE"
    })
  ],
  providers: [
    AuthGuard,
    LogoutGuard,
    UserService,
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
