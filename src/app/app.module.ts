import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { LoaderInterceptorService } from './_interceptors/loader-interceptor.service';
import { ErrorInterceptorService } from './_interceptors/error-interceptor.service';
import { JwtInterceptorService } from './_interceptors/jwt-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    DragDropModule
  ],
  providers: [CookieService ,
    {provide : HTTP_INTERCEPTORS , useClass : JwtInterceptorService , multi : true},
    {provide : HTTP_INTERCEPTORS , useClass : ErrorInterceptorService , multi : true},
    {provide : HTTP_INTERCEPTORS , useClass : LoaderInterceptorService , multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
