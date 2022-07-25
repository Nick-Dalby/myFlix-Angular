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

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }
}
