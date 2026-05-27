import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    private authSrv = inject(AuthService);

  userRole: string | null = null;

  currentUser$ = this.authSrv.currentUser$;

  ngOnInit() {
    this.userRole = this.authSrv.getCurrentUser()?.role ?? null;
  }

  logout() {
    this.authSrv.logout();
  }
}
