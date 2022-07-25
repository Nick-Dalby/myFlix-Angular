import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      
      return this.user;
    });
  }

  openEditDialog() {
    this.dialog.open(EditProfileComponent, {
      width: '400px',
    });
  }

  deleteAccount() {
    if (confirm('are you sure you want to delete your account?')) {
      this.router.navigate(['']).then(() => {
        this.snackBar.open('account deleted', 'OK', {
          duration: 3000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log(response);
        localStorage.clear();
      });
    }
  }
}
