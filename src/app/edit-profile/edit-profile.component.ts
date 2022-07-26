import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  @Input() userData: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
  
  /**
   * API call to update user data
   */

  updateUserInfo() {
    console.log('updating info');
    this.fetchApiData.editUser(this.userData).subscribe(
      (response) => {
        this.dialogRef.close();
        console.log(response);

        this.snackBar.open('Update successful!', 'OK', {
          duration: 3000,
        });
        if (this.userData.Username || this.userData.Password) {
          localStorage.clear();
          this.router.navigate(['welcome']);
          this.snackBar.open('Login again with your updated info', 'OK', {
            duration: 4000,
          });
        }
      },
      (response) => {
        this.snackBar.open('Update failed :(', 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
