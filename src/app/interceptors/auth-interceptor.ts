import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/security/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let authReq = req;
        if(!req.url.endsWith("login") && !req.url.endsWith("logout") 
        && (req.method === "POST" || req.method === "PUT" || req.method === "DELETE")){
            // Get the auth token from the auth service
            const authToken = this.authService.getAuthorizationToken();
            //Clone the request and replace the original headers with cloned headers, updated with the authorization.
            if(authToken !== null){
                authReq = req.clone({headers: req.headers.set('Authorization', authToken)});
            }
            
        }

        return next.handle(authReq);
    }
}