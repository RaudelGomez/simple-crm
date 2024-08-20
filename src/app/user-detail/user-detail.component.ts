import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.class';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';

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
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private userService: UserService) { 
    this.userService.loadUsers();   
  }
  
  ngOnInit() {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.userId = params['id'];
        this.getUserDetails();
      })
    );
  }

  ngOnDestroy(): void {
    // Cancel all subscriptions when destroying the component.
    this.subscription.unsubscribe();
  }

  getUserDetails() {
    const userSubscription = this.userService.users$.subscribe(users => {
      this.user$ = users.find(user => user.id === this.userId);
      console.log(this.user$);
      this.loading = false;
    });

    // Add this subscription to the general handler.
    this.subscription.add(userSubscription);
  }
}


