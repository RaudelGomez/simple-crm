import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from "../models/user.class";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@Component({
	selector: "app-user-detail",
	standalone: true,
	imports: [MatCardModule, MatProgressBarModule, MatIconModule, MatButtonModule, MatMenuModule],
	templateUrl: "./user-detail.component.html",
	styleUrl: "./user-detail.component.scss",
})
export class UserDetailComponent {
	userId!: string;
	user?: User;
	loading: boolean = true;


	constructor(private route: ActivatedRoute, private userService: UserService) {
		this.userService.loadUsers();
	}

	async ngOnInit() {
		this.route.params.subscribe(async (params) => {
			this.userId = params["id"];

			const userData = await this.userService.getUserDataBase("users",this.userId);
			if (userData) {
				this.user = new User(userData);
			} else {
				console.log("No user data found");
			}
			this.loading = false;
		});
	}

	editUserDetails(){

	}

	editAddressDetails(){

	}

}
