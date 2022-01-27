import { AtmRoutingModule } from './atm-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtmComponent } from './atm.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AtmRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AtmComponent]
})
export class AtmModule { }
