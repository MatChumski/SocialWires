import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateMessageComponent } from './create-message/create-message.component';
import { AuthInterceptor } from './auth.interceptor';
import { MessageCardComponent } from './message-card/message-card.component';
import { MyMessagesComponent } from './my-messages/my-messages.component';

const appRoutes:Routes=[
  {path:'', component:MainViewComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'messages/create', component:CreateMessageComponent},
  {path:'messages/me', component:MyMessagesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    MainHeaderComponent,
    LoginComponent,
    SignupComponent,
    CreateMessageComponent,
    MessageCardComponent,
    MyMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
