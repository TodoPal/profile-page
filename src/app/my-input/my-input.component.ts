import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'my-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgIconComponent
  ],
  viewProviders: [
    provideIcons({ heroEye, heroEyeSlash })
  ],
  templateUrl: './my-input.component.html',
})
export class MyInputComponent {
  @Input() costumeFormControl: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() minCharacters: number | undefined;
  @Input({ required: true }) type: 'password' | 'text' = 'text';

  hidePwd = true
}
