import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [
    MatToolbarModule,
    MatDialogModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})
export class MaterialModule {
}

// Have created this new module that shall able to allow us keep a track of different components that we are using in the project

