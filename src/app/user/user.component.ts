import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, CommonModule, MatCardModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  dialog = inject(MatDialog);


  constructor(public userService: UserService){
    this.userService.loadUsers();
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent)
  }
}
