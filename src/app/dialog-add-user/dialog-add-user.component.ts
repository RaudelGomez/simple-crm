import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';


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
  birthDate!: Date;

  user: User = new User();
  // public firestore: Firestore = inject(Firestore);

  constructor(){
    // const aCollection = collection(this.firestore, 'users');
    // console.log(collectionData(aCollection));
    // this.getUsers();
  }

  // getUsers(){
  //   return collection(this.firestore, 'users');
  // }

  saveUser(){
    this.user.birthDate = this.birthDate.getTime();
       
    // this.firestore
    //   .collection('users')
    //   .add(this.user.toJSON())
    //   .then((result:any)=>{
    // })
   
  }
}
