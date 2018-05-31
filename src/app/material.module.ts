import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material';
import {MatChipsModule} from '@angular/material';
import {MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class MaterialModule { }

// Have created this new module that shall able to allow us keep a track of different components that we are using in the project

