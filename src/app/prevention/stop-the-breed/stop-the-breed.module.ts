import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StopTheBreedComponent} from './stop-the-breed.component';
import { DialogComponent } from './dialog/dialog.component';
import {ButtonNavComponent} from '../../button-nav/button-nav.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule, SharedModule,
  ],
  declarations: [StopTheBreedComponent, DialogComponent],
  exports: [StopTheBreedComponent],
  entryComponents: [DialogComponent],
})
export class StopTheBreedModule { }
