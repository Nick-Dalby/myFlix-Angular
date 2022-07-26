import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public router: Router) { }

/**
 * logs user out, clears username and JWT from local storage
 */

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }
}
