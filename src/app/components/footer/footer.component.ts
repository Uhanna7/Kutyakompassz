import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isPhonePortrait = false;

  constructor(
    private responsive: BreakpointObserver,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;

      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });
  }

  openAuthDialog() {
    const dialogRef = this.dialog.open(AuthDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }
}
