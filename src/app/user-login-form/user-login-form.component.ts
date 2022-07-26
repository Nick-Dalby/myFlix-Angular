import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

/**
 * calls user login function with form data
 */

  userLogin(): void {
    this.fetchApiData
      .userLogin(this.userData.Username, this.userData.Password)
      .subscribe(
        (response) => {
          this.dialogRef.close();
          console.log(response);
          
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
