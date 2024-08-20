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

	/**
	 * This function subscribe the user found from the service to the observable Observable.
	 * @param route - Module from Angular for take params and query from URL
	 * @param userService - A User Service
	 */
	constructor(private route: ActivatedRoute, private userService: UserService) {
		// Escucha los cambios en la lista de usuarios
		this.userService.users$.subscribe(users => {
			// Encuentra el usuario actualizado por su ID
			const user = users.find(u => u.id === this.userId);
			if (user) {
				this.user = new User(user); // Actualiza el usuario si hay cambios
			}
		});
	}

	/**
	 * This function teak the params :id from the url and makes a query in 
	 * Firebase to bring the user. 
	 * With new User(userData) will be created an Instance of user and the variable user
	 * will be initialized
	 */
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

	/**
	 * This function open a dialog with the data of the current user and send it to the DialogEditUserComponent. 
	 * new User(this.user) makes a copy of the user and this one will be taken as model 
	 */
	editUserDetails(){
		const dialog = this.dialog.open(DialogEditUserComponent);
		dialog.componentInstance.user = new User(this.user);
		dialog.componentInstance.userId = this.userId;
		dialog.componentInstance.birthDateNumber = this.user.birthDate;
	}

	/**
	 * This function open a dialog with the data of the current user and send it to the DialogEditAddressComponent. 
	 * new User(this.user) makes a copy of the user and this one will be taken as model 
	 */
	editAddressDetails(){
		const dialog = this.dialog.open(DialogEditAddressComponent);
		dialog.componentInstance.user = new User(this.user);
		dialog.componentInstance.userId = this.userId;
	}

}
