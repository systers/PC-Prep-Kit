import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopTheBreedComponent } from './stop-the-breed.component';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule, SharedModule, MaterialModule
  ],
  declarations: [StopTheBreedComponent],
  exports: [StopTheBreedComponent],
})
export class StopTheBreedModule {
}
