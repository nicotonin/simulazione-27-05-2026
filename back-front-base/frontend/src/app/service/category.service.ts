import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from './category.entity';
import { User } from '../entities/user.entity';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  protected http = inject(HttpClient);

  list() {
    return this.http.get<Category[]>(`${environment.apiUrl}/category/listCategory`);
  }
}
