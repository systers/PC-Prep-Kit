import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonNavComponent } from './button-nav/button-nav.component';
import { MaterialModule } from './material.module';
import { NotifyService } from './badge/notify';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  declarations: [ButtonNavComponent],
  exports: [ButtonNavComponent],
  providers: [NotifyService]
})
export class SharedModule {
}
