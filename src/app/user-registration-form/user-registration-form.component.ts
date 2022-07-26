import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}
  
  /**
   * calls user registration function to send form data to the API 
   */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        this.dialogRef.close();

          // sign in directly after registering
        this.userLogin()
        // this.snackBar.open('account registered', 'OK', {
        //   duration: 2000,
        // });
      },
      (response) => {

        this.snackBar.open('something broke...', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  // sign in directly after registering
  userLogin(): void {
    this.fetchApiData
      .userLogin(this.userData.Username, this.userData.Password)
      .subscribe(
        (response) => {
          this.dialogRef.close();

          localStorage.setItem('token', response.token);
          localStorage.setItem('user', response.user.Username);
          this.snackBar.open('Login successful!', 'OK', {
            duration: 3000,
          });

          this.router.navigate(['movies']);
        },
        (response) => {
          this.snackBar.open('Login failed :(', 'OK', {
            duration: 3000,
          });
        }
      );
  }
}
