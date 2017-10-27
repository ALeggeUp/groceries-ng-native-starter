import { Component } from "@angular/core";

import { User } from "./shared/user/user";

@Component({
  selector: "my-app",
  moduleId: module.id,
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
})

export class AppComponent {

  user: User;
  isLoggingIn = true;

  constructor() {
    this.user = new User();
  }

  submit() {
    console.log(`hello ${new Date()}`);
    alert("You’re using: " + this.user.email);
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}