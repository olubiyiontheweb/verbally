import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";

import { ServicesInterceptorService } from "./services/services-interceptor.service";
import { SharedModuleModule } from "./shared-module/shared-module.module";

import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { Media } from "@ionic-native/media/ngx";
import { File } from "@ionic-native/file/ngx";
import {
  FileTransfer,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { HTTP } from "@ionic-native/http/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SharedModuleModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServicesInterceptorService,
      multi: true,
    },
    Media,
    File,
    AndroidPermissions,
    FileTransfer,
    FileTransferObject,
    HTTP,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
