import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  domainPrefix = window.location.origin;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // tslint:disable-next-line:max-line-length
    this.domainPrefix === 'https://localhost:4200' ||
    this.domainPrefix === 'https://localhost:4200'
      ? (this.domainPrefix = 'https://davidcorp.quabbly.com')
      : (this.domainPrefix = this.domainPrefix);
    // add authorization header with jwt token if available
    const currentUser = this.authenticationService.currentUserWithToken();
    const userStateOption = this.userService.getUserState();
    // true == test and false == live
    if (currentUser && currentUser.token) {
      // if (currentUser.user.roles.some((role) => role === 'ADMIN')) {
      //   if (userStateOption === 'true') {
      //     request = request.clone({
      //       setHeaders: {
      //         Authorization: `Bearer ${currentUser.token}`,
      //         'x-env-state': 'live',
      //         'x-source': this.domainPrefix,
      //       },
      //     });
      //   } else {
      //     request = request.clone({
      //       setHeaders: {
      //         Authorization: `Bearer ${currentUser.token}`,
      //         'x-env-state': 'live',
      //         'x-source': this.domainPrefix,
      //       },
      //     });
      //   }
      // } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
            // 'x-env-state': 'live',
            'x-source': this.domainPrefix,
          },
        });
      // }
    } else {
      request = request.clone({
        setHeaders: {
          // 'x-env-state': 'live',
          'x-source': this.domainPrefix,
        },
      });
    }

    return next.handle(request);
  }
}
