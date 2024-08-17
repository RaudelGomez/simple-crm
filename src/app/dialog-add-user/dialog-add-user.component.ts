import { ChangeDetectionStrategy, Component, ChangeDetectorRef  } from '@angular/core';
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
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddUserComponent {
  birthDate?: Date;
  user: User = new User();

  constructor(public userService: UserService, private cdr:ChangeDetectorRef){}

  async saveUser(){
    this.userService.loading = true;
    this.cdr.detectChanges(); 
    this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0 ; 
    try { 
      this.userService.addUser(this.user);
    } catch (error) {
      console.error('Error adding document', error);
    } finally {
      setTimeout(() => {
        this.userService.loading = false;
        this.cdr.detectChanges(); 
      }, 500);
    }
  }
}
