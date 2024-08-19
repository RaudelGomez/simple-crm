import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.class';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId!:string;
  user$?:User;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private userService: UserService) { 
    this.userService.loadUsers();   
   
  }
  
  ngOnInit() {
     this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserDetails();
    });
  }
   
  getUserDetails(){
    this.userService.users$.subscribe(users => {
      this.user$ = users.find(user => user.id === this.userId);
      this.loading = false;
    });
   }

}
