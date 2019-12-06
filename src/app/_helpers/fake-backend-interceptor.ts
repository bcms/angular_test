import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, dematerialize, delay } from 'rxjs/operators';
import { User } from '../login/models/user';
import { UUID } from 'angular2-uuid';

let users: Array<User> = [
    //Painel A
    {
      id: UUID.UUID(),
      username: 'user1',
      password: 'Password1*',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOnRydWUsIlBhaW5lbEIiOmZhbHNlfX0.4Ee96WTCnno0LefvJOwbEOAA0XUNIl2-tSN7MLRu-Lo'
    },
    //Painel B
    {
      id: UUID.UUID(),
      username: 'user2',
      password: 'Password2*',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOmZhbHNlLCJQYWluZWxCIjp0cnVlfX0.6gJ1vvgtlQIpK_WQUvxc5WyLVUArprNABFNFlQt5flI'
    },
    //Painel A e B
    {
      id: UUID.UUID(),
      username: 'user3',
      password: 'Password3*',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOnRydWUsIlBhaW5lbEIiOnRydWV9fQ.6h9X9wXOI6y8rjm5bSDuK6JDG4Z26edM97LYH4nDpvo'
    },
    //Nenhum painel
    {
      id: UUID.UUID(),
      username: 'user4',
      password: 'Password4*',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOmZhbHNlLCJQYWluZWxCIjpmYWxzZX19.jxHEf6DXkfOwcWL6mTnzd9lMy7QZLNvg8p_7gJ-BJqM'
    },
  ]

export class FakeBackendInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = req;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/api/login/authenticate') && method === 'POST':
                    return authenticate();
                default:
                    // pass through any requests not handled above
                    return next.handle(req);
            }
        }

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                token: user.token
            });
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};