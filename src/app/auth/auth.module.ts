import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgMaterialModule } from '../root/modules/ng-material/ng-material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { TokenEffects } from './ngrx/effects/token.effects';
import { authStateKey, AUTH_REDUCERS } from './ngrx/reducers/index';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    StoreModule.forFeature(authStateKey, AUTH_REDUCERS),
    EffectsModule.forFeature([TokenEffects]),
    AuthRoutingModule,
  ],
})
export class AuthModule {}
