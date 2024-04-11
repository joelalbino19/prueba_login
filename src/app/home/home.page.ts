import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title: string | null = "";
  constructor() {

    this.title = localStorage.getItem('title');

  }

}
