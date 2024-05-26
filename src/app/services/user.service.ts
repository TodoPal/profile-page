import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile.model';
import { UserInputDto } from '../models/user_input_dto.model';

declare const System: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  async getUserName(): Promise<string> {
    const storeEvents = await System.import('@TodoPal/utils');
    return storeEvents.getUsername(this.cookieService.get('jwtToken'));
  }

  getProfile(username: string): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiUrl}/profile/${username}`);
  }

  deleteUser(username: string, password: string): Observable<any> {
    const userInputDto: UserInputDto = {
      username,
      password,
      joined: ''
    };
    return this.http.delete(`${environment.apiUrl}/users/username`, {
      body: userInputDto
    });
  }
}
