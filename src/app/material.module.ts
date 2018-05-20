import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatToolbarModule
  ],
  exports: [
    MatToolbarModule
  ]
})
export class MaterialModule { }

// Have created this new module that shall able to allow us keep a track of different components that we are using in the project

