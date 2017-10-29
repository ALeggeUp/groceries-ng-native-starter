import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { Color } from "color";
import { Page } from "ui/page";
import { View } from "ui/core/view";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
  selector: "my-app",
  providers: [UserService],
  moduleId: module.id,
  templateUrl: "./login.html",
  styleUrls: ["./login-common.css", "./login.css"]
})

export class LoginComponent implements OnInit {

  user: User;
  isLoggingIn = true;

  @ViewChild("container") container: ElementRef;

  constructor(private router: Router, private userService: UserService, private page: Page) {
    this.user = new User();
  }

  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }

    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
  }

  login() {
    this.userService.login(this.user)
      .subscribe(
        () => this.router.navigate(["/list"]),
        (error) => alert("Unfortunately we could not find your account.")
      );
  }

  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://bg_login";
  }
}
