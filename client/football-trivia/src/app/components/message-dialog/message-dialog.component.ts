import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
})
export class MessageDialogComponent {
  title: string;
  message: string;
  isCorrect: boolean

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { title: string; message: string; isCorrect: boolean }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.isCorrect = data.isCorrect;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
