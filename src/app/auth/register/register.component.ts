import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(private serviceAuth: AuthService) { }

  ngOnInit() {
  }

  public onSubmit(data: any) {
    console.log(data);
    this.serviceAuth.register(data.name, data.email, data.password);
  }

}
