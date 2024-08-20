import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, CommonModule, MatDialogContent, MatDialogActions, MatButtonModule, MatProgressBarModule, FormsModule, MatDatepickerModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  user!: User;
  userId!: string;
  birthDateNumber!: number;
  birthDate!: Date;

  // this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0 ; 

  constructor(public userService: UserService, public dialogRef: MatDialogRef<DialogEditUserComponent>){}

  ngOnInit(): void {
    this.birthDate = new Date(this.birthDateNumber);  
  }

  async saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    await this.userService.updateUser('users', this.userId, this.user);
    this.dialogRef.close();
  }
}
