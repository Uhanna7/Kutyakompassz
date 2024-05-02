import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  open: boolean = false;
  isPhonePortrait = false;

  destroyed$ = new Subject<void>();

  help: {question: string, response: string, open: boolean}[] =
    [
      {
        question: 'Mire jó az oldal?',
        response: 'Az oldal a gazdiktól elszökött kutyusok hazatalálását és a kóbor kutyák menhelyre/ideiglenes befogadókhoz jutását segíti.',
        open: false
      },
      {
        question: 'Hogyan posztolhatok?',
        response: 'Kattins a Kutyát találtam/Kutyát keresek menüpontok valamelyikére jelentkezz be/regisztrálj, majd töltsd ki a szükséges űrlapot.',
        open: false
      },
      {
        question: 'Hogyan tudok segíteni?',
        response: 'Ha kóbor kutyát látsz és nem tudsz rajta segíteni, akkor töltsd fel az oldalra és várj, amíg valaki más indul a kutyus segítségére.',
        open: false
      },
    ];

  constructor(private responsive: BreakpointObserver) {

  }

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;

      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  openRes(index: number) {
    this.help[index].open = !this.help[index].open;
  }
}
