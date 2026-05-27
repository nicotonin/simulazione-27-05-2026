import { Component, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { RequestService } from '../../service/request.service';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { User } from '../../entities/user.entity';

@Component({
  standalone: false,
  selector: 'app-analytics',
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class Analytics implements OnInit {

  private requestService = inject(RequestService);
  private userService = inject(UserService);
  private authSrv = inject(AuthService);

  requests: any[] = [];
  users: User[] = [];

  selectedUser: string = '';
  selectedMonth: string = '';

  loading = true;

  totalPermessi = 0;
  totalGiorni = 0;

  ngOnInit() {

    const user = this.authSrv.getCurrentUser();
    if (user?.role !== 'role2') return;

    this.loading = true;

    // 🔥 caricamento parallelo ROBUSTO
    forkJoin({
      users: this.userService.list1('role1'),
      requests: this.requestService.list()
    }).subscribe({
      next: (res) => {

        this.users = res.users;
        this.requests = res.requests;

        this.calculate();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // SOLO APPROVATE
  get filtered() {
    return this.requests
      .filter(r => r.stato === 'Approvato')
      .filter(r => {

        const byUser =
          !this.selectedUser ||
          this.extractUserId(r.role1ID) === this.selectedUser;

        const byMonth =
          !this.selectedMonth ||
          (new Date(r.dataInizio).getMonth() + 1) === +this.selectedMonth;

        return byUser && byMonth;
      });
  }

  // 🔥 FIX ROBUSTO: gestisce string o oggetto
  private extractUserId(role1: any): string {
    if (!role1) return '';
    if (typeof role1 === 'string') return role1;
    return role1._id;
  }

  getUserName(id: string) {
    const u = this.users.find(x => x.id === id);
    return u ? `${u.firstName} ${u.lastName}` : 'Utente sconosciuto';
  }

  getDays(r: any) {
    const start = new Date(r.dataInizio);
    const end = new Date(r.dataFine);

    return Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / 86400000)
    );
  }

  calculate() {
    const data = this.filtered;

    this.totalPermessi = data.length;

    this.totalGiorni = data.reduce((sum, r) => {
      return sum + this.getDays(r);
    }, 0);
  }

  onFilterChange() {
    this.calculate();
  }
}