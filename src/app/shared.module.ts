import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonNavComponent} from './button-nav/button-nav.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ButtonNavComponent],
  exports: [ButtonNavComponent]
})
export class SharedModule { }
