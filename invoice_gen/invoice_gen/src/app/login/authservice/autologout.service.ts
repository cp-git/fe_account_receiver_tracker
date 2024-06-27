import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subject, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutologoutService {
  private userActivity$: Subject<void> = new Subject<void>();
  private timeout: number = 900000; // Provide a default value

  constructor(
    private router: Router
  ) {
    this.resetUserActivityTimer();
  }

  // Method to set timeout and start the timer
  setTimeout(timeout: number): void {
    this.timeout = timeout;
    this.resetUserActivityTimer();
  }

  // Method to reset user activity timer
  resetUserActivityTimer(): void {
    this.userActivity$.next(); // Emit a value to cancel the previous timer
    timer(this.timeout).pipe(takeUntil(this.userActivity$)).subscribe(() => {
      this.logout();
    });
  }

  // Method to simulate user activity
  simulateUserActivity(): void {
    this.resetUserActivityTimer(); // Reset timer on user activity
  }

  // Method to logout user
  logout(): void {
    this.router.navigate(['/login']);
    // alert("logout");
    // Perform logout logic here, such as clearing session data and navigating to login page
  }
}
