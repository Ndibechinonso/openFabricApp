import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CookiesService } from './cookies.service';
import { environment } from 'src/environments/environment';
import { UserModel,LoginResponse } from './core/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user!: UserModel;
  userWithToken!: LoginResponse;

  constructor(private http: HttpClient, private cookieService: CookiesService) { }

  public currentUser(): UserModel {
    if (!this.user) {
      this.user =  JSON.parse(this.cookieService.getCookie('currentUser') || `{}`);
    }
    return this.user;
  }
  public currentUserWithToken(): LoginResponse {
    if (!this.userWithToken) {
      this.userWithToken = JSON.parse(localStorage.getItem('loginResponse') || `{}`)
    }
    return this.userWithToken;
  }

  login(value: any) {
    return this.http
      .post<any>(`${environment.baseUrl}/auth/login`, value)
      .pipe(
        map((loginResponse: any) => {

          if (loginResponse && loginResponse.token) {
            this.userWithToken = loginResponse;
            this.user = loginResponse.user;
            // store user details and jwt in cookie
            this.cookieService.setCookie(
              'currentUser',
              JSON.stringify(this.user),
              1
            );
            localStorage.setItem(
              'loginResponse',
              JSON.stringify(loginResponse)
            );
          }
          return loginResponse;
        })
      );
  }

  logout() {
    this.cookieService.deleteCookie('currentUser');
    localStorage.removeItem('loginResponse');
    this.http.get(`${environment.baseUrl}/auth/logout/`);
  }

}
