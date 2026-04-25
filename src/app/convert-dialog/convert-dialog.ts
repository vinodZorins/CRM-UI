import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule, MatLabel } from "@angular/material/input";
import { MatOption, MatSelectModule } from "@angular/material/select";


@Component({
  selector: 'app-convert-dialog',
  imports: [
            MatDialogContent, 
            MatDialogActions,
            MatDialogModule,
            FormsModule, 
            MatFormFieldModule, 
            MatLabel, 
            MatOption, 
            MatSelectModule,
            MatInputModule,

          ],
  templateUrl: './convert-dialog.html',
  styleUrl: './convert-dialog.css',
})
export class ConvertDialog implements OnInit {

   requirement = '';
   status = 'ACTIVE'; // default

  constructor(
    public dialogRef: MatDialogRef<ConvertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('Dialog Data:', this.data); 
  }

  convert() {
    this.dialogRef.close({
      requirement: this.requirement,
      status: this.status
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
