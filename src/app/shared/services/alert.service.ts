import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [className]
    });
  }

  showError(message: string) {
    this.openSnackBar(message, 'Ok', 'mat-snack-bar-container-error');
  }

  showInfo(message: string) {
    this.openSnackBar(message, 'Ok', 'mat-snack-bar-container-info');
  }

  showSuccess(message: string) {
    this.openSnackBar(message, 'Ok', 'mat-snack-bar-container-success');
  }
  
}
