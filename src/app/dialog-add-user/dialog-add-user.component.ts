import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogContent, MatDialogActions, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddUserComponent {
  birthDate?: Date;

  user: User = new User();

  constructor(public userService: UserService){}

  saveUser(){
    this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0 ;  
    this.userService.addUser(this.user);
  }
}
