import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      url: 'http://localhost:8080/lms',
    });

    if (this.excludeToken(request.url)) {
      return next.handle(modifiedRequest);
    }

    const token = this.authService.getToken();
    const authorizedRequest = modifiedRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authorizedRequest);
  }

  excludeToken(url: string): boolean {
    const excludedUrls: string[] = [
      'http://localhost:8080/lms/login',
      'http://localhost:8080/lms/auth/admin',
    ];

    return excludedUrls.some((excludedUrl) => url.includes(excludedUrl));
  }
}
