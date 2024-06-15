import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any = {};
  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fnGetInfoUser();
  }


  fnGetInfoUser() {
    let userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      this.user = JSON.parse(userLocalStorage)
    }
  }

  fnBack() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
