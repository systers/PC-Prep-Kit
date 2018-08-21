import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StridesAgainstComponent } from './strides-against.component';
import { SharedModule } from '../../shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule, SharedModule, MaterialModule
  ],
  declarations: [StridesAgainstComponent, DialogComponent],
  exports: [StridesAgainstComponent],
  entryComponents: [DialogComponent],
})
export class StridesAgainstModule { }

