import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;
  isPhonePortrait = false;

  constructor(
    private responsive: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;

      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });

    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.afAuth.signOut();
  }
}