import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UUID } from 'angular2-uuid';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private users: Array<User> = [
    //Painel A
    {
      id: UUID.UUID(),
      username: 'user1',
      password: 'password1',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOnRydWUsIlBhaW5lbEIiOmZhbHNlfX0.4Ee96WTCnno0LefvJOwbEOAA0XUNIl2-tSN7MLRu-Lo'
    },
    //Painel B
    {
      id: UUID.UUID(),
      username: 'user2',
      password: 'password2',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOmZhbHNlLCJQYWluZWxCIjp0cnVlfX0.6gJ1vvgtlQIpK_WQUvxc5WyLVUArprNABFNFlQt5flI'
    },
    //Painel A e B
    {
      id: UUID.UUID(),
      username: 'user3',
      password: 'password3',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOnRydWUsIlBhaW5lbEIiOnRydWV9fQ.6h9X9wXOI6y8rjm5bSDuK6JDG4Z26edM97LYH4nDpvo'
    },
    //Nenhum painel
    {
      id: UUID.UUID(),
      username: 'user4',
      password: 'password4',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOmZhbHNlLCJQYWluZWxCIjpmYWxzZX19.jxHEf6DXkfOwcWL6mTnzd9lMy7QZLNvg8p_7gJ-BJqM'
    },
  ]

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {

    return this.http.post<User>("https://api.brunodev.in/api/login/authenticate", { username: username, password: password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
