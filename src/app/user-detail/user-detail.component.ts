import { Component, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from "../models/user.class";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from "@angular/material/dialog";
import { DialogEditUserComponent } from "../dialog-edit-user/dialog-edit-user.component";
import { DialogEditAddressComponent } from "../dialog-edit-address/dialog-edit-address.component";

@Component({
	selector: "app-user-detail",
	standalone: true,
	imports: [MatCardModule, MatProgressBarModule, MatIconModule, MatButtonModule, MatMenuModule],
	templateUrl: "./user-detail.component.html",
	styleUrl: "./user-detail.component.scss",
})
export class UserDetailComponent {
	userId!: string;
	user: User = new User();
	loading: boolean = true;

	dialog = inject(MatDialog);

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
			//console.log(this.user);
			this.loading = false;
		});
	}

	editUserDetails(){
		const dialog = this.dialog.open(DialogEditUserComponent);
		dialog.componentInstance.user = this.user;
	}

	editAddressDetails(){
		const dialog = this.dialog.open(DialogEditAddressComponent);
		dialog.componentInstance.user = this.user;
	}

}
