import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoaded: boolean = false;
  public initialValue: string = '';

  constructor(
    private readonly countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCapital.countries;
    this.initialValue = this.countryService.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void {
    this.isLoaded = true;
    this.countryService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoaded = false;
      });
  }
}
