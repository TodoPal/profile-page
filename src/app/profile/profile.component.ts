import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, filter, from, map, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Profile } from '../models/profile.model';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';
import { MyInputComponent } from '../my-input/my-input.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    MyInputComponent
  ],
  viewProviders: [
    provideIcons({ heroTrash })
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  isAvatarLoaded = signal<boolean>(false);

  protected currentUsername: string = '';
  profile$: Observable<Profile> | undefined;

  /**
   * The password must contain at least:
   *    * one digit (0-9)
   *    * one lowercase letter (a-z)
   *    * one uppercase letter (A-Z)
   *    * one special character (@$!%*#?&^_-)
   * It must be at least 10 characters long
   */
  private readonly pwd_regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&^_-])[A-Za-z\d[@$!%*#?&^_-].{9,}/;

  pwdFormGroup = this._formBuilder.group({
    pwdCtrl: [ '', [ Validators.required, Validators.minLength(10), Validators.pattern(this.pwd_regex) ] ]
  });

  constructor(private _formBuilder: FormBuilder, private service: UserService) {
    from(this.service.getUserName()).pipe(
      takeUntilDestroyed(),
      filter(username => username !== null),
      tap(username => {
        this.currentUsername = username;
        this.profile$ = this.service.getProfile(username)
      })
    ).subscribe();
  }

  deleteUser(): void {
    console.log('Deleting user...');
    this.service.deleteUser(this.currentUsername, this.pwdFormGroup.value.pwdCtrl ?? '').subscribe();
  }
}
