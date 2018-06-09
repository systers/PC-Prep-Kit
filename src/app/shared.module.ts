import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonNavComponent } from './button-nav/button-nav.component';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  declarations: [ButtonNavComponent],
  exports: [ButtonNavComponent],
})
export class SharedModule {
}
