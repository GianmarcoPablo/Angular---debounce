import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly url = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: "", countries: [] },
    byCountry: { term: "", countries: [] },
    byRegion: { region: "", countries: [] },
  }

  constructor(
    private readonly http: HttpClient
  ) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cache', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    const cache = localStorage.getItem('cache');
    if (cache) {
      this.cacheStore = JSON.parse(cache);
    }
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError((error) => of([])),
      )
  }

  public searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/capital/${term}`).pipe(
      tap((countries) => this.cacheStore.byCapital = { term, countries }),
      tap(() => this.saveToLocalStorage())
    )
  }

  public searchCoutry(country: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/name/${country}`).pipe(
      tap((countries) => this.cacheStore.byCountry = { term: country, countries }),
      tap(() => this.saveToLocalStorage())
    )
  }

  public searchRegion(region: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/region/${region}`)
      .pipe(
        tap((countries) => this.cacheStore.byRegion = { region, countries }),
        tap(() => this.saveToLocalStorage())
      )
  }

  public searchAlpha(id: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.url}/alpha/${id}`).pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError((error) => of(null))
    )
  }


}
