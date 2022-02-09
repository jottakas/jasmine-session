import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  catFacts: any;
  isLoading = false;
  isHttpError: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  /** Not called. Created to showcase testing of http client */
  getCatFacts() {
    this.isLoading = true;
    
    this.http.get(CAT_FACTS_URL).subscribe(
      (r) => {
        this.catFacts = r;
        this.isLoading = false;
      },
      (_err) => {
        this.isHttpError = true;
        this.isLoading = false;
      }
    );
  }

  /** Not called. Created to showcase testing of routing */
  navigateTo() {
    this.router.navigate(['navigated']);
  }
}

export const CAT_FACTS_URL = 'https://cat-fact.herokuapp.com/facts';
