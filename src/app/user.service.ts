import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ProductMdodel } from './core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // state: live or test;
  setUserState(userStateValue: any) {
    localStorage.setItem('userState', userStateValue);
  }

  getUserState() {
    return localStorage.getItem('userState');
  }

  getAllProducts() {
    return this.http.get<any>(`${environment.baseUrl}/products`);
  }

  addProduct(product: any) {
    return this.http
      .post<any>(`${environment.baseUrl}/products/addProduct`, product)
      .pipe(map((response) => {
        return response;
      }));
  }
  editProductDescription(id: string, product: any) {
    return this.http
      .post<any>(`${environment.baseUrl}/products/editProduct`, {id, product})
      .pipe(map((response) => {
        return response;
      }));
  }
}
