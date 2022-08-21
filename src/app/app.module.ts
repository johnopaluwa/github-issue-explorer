import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { NgMaterialModule } from './root/modules/ng-material/ng-material.module';
import { HeaderInterceptor } from './root/services/header.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production,
    }),
    NgMaterialModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
