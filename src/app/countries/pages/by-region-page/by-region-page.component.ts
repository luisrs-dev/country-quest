import { Component } from '@angular/core';
import { CountriesService } from '../../countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions: Region[] = ["Africa","America","Asia", "Europe", "Oceania"];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  searchByRegion(region: Region) {
    this.selectedRegion = region;
    this.countriesService.searchCountry(region).subscribe((countries) => {
      this.countries = countries;
    });
  }

}
