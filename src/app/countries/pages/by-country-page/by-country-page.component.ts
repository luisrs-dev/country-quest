import { Component } from '@angular/core';
import { CountriesService } from '../../countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  countries: Country[] = [];
  public country: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(){
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.country = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(term: string) {
    this.countriesService.searchCountry(term).subscribe((countries) => {
      this.countries = countries;
    });
  }


}
