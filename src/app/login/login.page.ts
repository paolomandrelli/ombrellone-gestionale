import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OMAuth } from '../interfaces/om-auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  loginSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private ms: MessageService,
    private r: Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  ngOnInit() {
  }

  login(): void {
    this.loginSub = this.as.login(this.loginForm.value)
      .subscribe((response: OMAuth.LoginResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.id);
        this.as.showMessage(
          'Operazione riuscita',
          'Login effettuato con successo',
          'success',
          3000
        );
        this.r.navigate([`dashboard/main`], {
          replaceUrl: true
        });

      }, ko => {
        console.log('RESPONSE KO', ko);
        this.as.showMessage(
          'Operazione non riuscita',
          'Ricontrolla le credenziali',
          'error',
          3000
        )
      })
  }

}
