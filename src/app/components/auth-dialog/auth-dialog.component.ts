import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit{
  authForm!: FormGroup;
  errorMessage: string = '';
  isRegistration: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const email = this.authForm.get('email')?.value;
    const password = this.authForm.get('password')?.value;

    if (this.isRegistration) {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          this.dialogRef.close();
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
    } else {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          this.dialogRef.close();
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
    }
  }

  toggleRegistration() {
    this.isRegistration = !this.isRegistration;
  }
  
}
