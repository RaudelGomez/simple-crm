import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../models/user.class';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatDialogContent, MatDialogActions, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  loading: boolean = false;
  user!: User;

  constructor(public userService: UserService, private cdr:ChangeDetectorRef, public dialogRef: MatDialogRef<DialogEditAddressComponent>){}

  saveUser(){

  }
}