import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  logger = {
    email: '',
    password: ''
  }
  type: string;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const currentUrl = this.router.url;
    if(currentUrl.indexOf("admin") !== -1)
    {
      this.type = "Admin";
    }
    else if(currentUrl.indexOf("editor") !== -1)
    {
      this.type = "Editor";
    }
  }

  onSubmit()
  {
    this.logger.email = this.loginForm.value.email;
    this.logger.password = this.loginForm.value.password;
    if(this.type === "Admin")
    {
      this.authService.loginAdmin(this.logger);
    }
    else if(this.type === "Editor")
    {
      this.logger['id'] = 0;
      this.logger['name'] = 'xyz';
      this.logger['enabled'] = true;
      this.authService.loginEditor(this.logger);
    }
  }
}
