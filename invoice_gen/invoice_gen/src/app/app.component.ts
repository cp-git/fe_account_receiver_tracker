import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AutologoutService } from './login/authservice/autologout.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AutologoutService) { }

  // Listen for user activity events
  @HostListener('window:mousemove') onMouseMove() {
    this.authService.simulateUserActivity();
  }

  @HostListener('window:keypress') onKeyPress() {
    this.authService.simulateUserActivity();
  }
}
