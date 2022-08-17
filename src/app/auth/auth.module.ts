import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { TokenEffects } from './ngrx/effects/token.effects';
import { AUTH_REDUCERS } from './ngrx/reducers/index';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature('auth', AUTH_REDUCERS),
    EffectsModule.forFeature([TokenEffects]),
    AuthRoutingModule,
  ],
})
export class AuthModule {}
