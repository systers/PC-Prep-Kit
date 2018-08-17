import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonNavComponent } from './button-nav/button-nav.component';
import { MaterialModule } from './material.module';
import { NotifyService } from './badge/notify';
import { LevelNavigateComponent } from './level-navigate/level-navigate.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  declarations: [ButtonNavComponent, LevelNavigateComponent],
  exports: [ButtonNavComponent, LevelNavigateComponent],
  providers: [NotifyService]
})
export class SharedModule {
}
