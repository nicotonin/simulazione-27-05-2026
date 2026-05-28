import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RequestService } from '../../service/request.service';
import { UserService } from '../../service/user.service';
import { User } from '../../service/user.entity';

@Component({
  standalone: false,
  selector: 'app-analytics',
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class Analytics implements OnInit {

  private userService = inject(UserService);
  private requestService = inject(RequestService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];
  requests: any[] = [];

  role: string = 'role1';

  selectedUserId: string = '';
  selectedMonth: string = '';

  ngOnInit() {

    // utenti
    this.userService.list(this.role).subscribe(res => {
      this.users = res;
      this.cdr.detectChanges();
    });

    // richieste (USO SOLO list())
    this.requestService.list().subscribe(res => {
      this.requests = res;
      this.cdr.detectChanges();
    });
  }

  get filtered() {
    return this.requests.filter(r => {

      const byStatus = r.stato === 'Approvato';

      const byUser =
        !this.selectedUserId ||
        r.role1ID?.toString() === this.selectedUserId;

      const byMonth =
        !this.selectedMonth ||
        (new Date(r.dataInizio).getMonth() + 1) === Number(this.selectedMonth);

      return byStatus && byUser && byMonth;
    });
  }

  get totalPermessi() {
    return this.filtered.length;
  }

  get totalGiorni() {
    return this.filtered.reduce((sum, r) => {

      const start = new Date(r.dataInizio);
      const end = new Date(r.dataFine);

      return sum + Math.max(
        1,
        Math.ceil((end.getTime() - start.getTime()) / 86400000)
      );
    }, 0);
  }

  getUserName(id: string) {
    const u = this.users.find(x => x.id === id);
    return u ? `${u.firstName} ${u.lastName}` : 'Utente sconosciuto';
  }
}