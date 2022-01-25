import { AtmRoutingModule } from './atm-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtmComponent } from './atm.component';

@NgModule({
  imports: [
    CommonModule,
    AtmRoutingModule
  ],
  declarations: [AtmComponent]
})
export class AtmModule { }
