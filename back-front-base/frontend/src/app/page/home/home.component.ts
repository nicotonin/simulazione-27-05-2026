import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { RequestService } from '../../service/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRequestModal } from '../../components/add-request-modal/add-request-modal';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  protected requestService = inject(RequestService);
  protected authSrv = inject(AuthService);
  private modalService = inject(NgbModal);

  refresh$ = new BehaviorSubject<void>(undefined);

  userRole: string | null = null;
  user: User | null = null;

  ngOnInit() {
    this.user = this.authSrv.getCurrentUser();
    this.userRole = this.user?.role ?? null;
  }

  request$ = this.authSrv.isAuthenticated$.pipe(
    switchMap(isAuth => {
      if (!isAuth) return of([]);

      return this.refresh$.pipe(
        switchMap(() =>
          this.requestService.list().pipe(
            catchError(err => {
              console.error(err);
              return of([]);
            })
          )
        )
      );
    })
  );

  openAdd() {
    const modalRef = this.modalService.open(AddRequestModal);

    modalRef.result.then((result) => {
      this.requestService.add(result).subscribe(() => {
        this.refresh$.next();
      });
    }).catch(() => {});
  }

  refreshRequests() {
  this.requestService.list().subscribe(list => {
    this.request$ = of(list);
  });
}

deleteRequest(id: string) {
  this.requestService.delete(id).subscribe(() => {
    this.refreshRequests();
  });
}

  approveRequest(id: string) {
    this.requestService.approveRequest(id).subscribe(() => {
      this.refresh$.next();
    });
  }

  rejectRequest(id: string) {
    this.requestService.rejectRequest(id).subscribe(() => {
      this.refresh$.next();
    });
  }

  editRequest(request: any) {
    const modalRef = this.modalService.open(AddRequestModal);

    modalRef.componentInstance.dataInizio = request.dataInizio;
    modalRef.componentInstance.dataFine = request.dataFine;
    modalRef.componentInstance.categoriaId = request.categoriaId;
    modalRef.componentInstance.motivazione = request.motivazione;

    modalRef.result.then(result => {
      this.requestService.update(request.id, result).subscribe(() => {
        this.refresh$.next();
      });
    }).catch(() => {});
  }
}