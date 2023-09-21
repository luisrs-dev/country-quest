import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public capital: string  = '';
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(){
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.capital = this.countriesService.cacheStore.byCapital.term;
  }

    searchByCapital(term: string) {

    this.isLoading = true;
    this.countriesService.searchCapital(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
