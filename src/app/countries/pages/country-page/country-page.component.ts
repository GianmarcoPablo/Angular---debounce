import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {

  public country?: Country

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.countryService.searchAlpha(id)
        )
      ).subscribe((country) => {
        if (!country) {
          this.router.navigateByUrl('/countries');
          return;
        }
        this.country = country;
        
      })
  }
  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly countryService: CountryService,
    private router: Router
  ) { }

}
