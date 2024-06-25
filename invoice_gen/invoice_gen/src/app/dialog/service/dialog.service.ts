import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public openDeleteConfirmation(): Observable<boolean> {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
      width: '560px',
      data: { message: 'Are you sure you want to add this invoice?' }
    });

    return dialogRef.afterClosed().pipe(
      map(result => {
        return result === true; // Returns true if user clicks OK, false otherwise
      })
    );
  }

  public openDeleteConfirmationDialog(message: string): Observable<boolean> {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
      width: '560px',
      data: { message: message }
    });

    return dialogRef.afterClosed().pipe(
      map(result => {
        return result === true; // Returns true if user clicks OK, false otherwise
      })
    );
  }
}
