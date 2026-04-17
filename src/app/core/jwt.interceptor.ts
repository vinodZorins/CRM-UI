import { HttpInterceptorFn } from "@angular/common/http";

export const jwtInterceptor: 
HttpInterceptorFn = (req, next) => {

    const token = localStorage.getItem("token");

    // Skip url's
    if(req.url.includes('/api/auth/login') || req.url.includes('/api/auth/register')) {

        return next(req);
    }

    if(token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req);
};