import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent  implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ["Africa","America","Asia", "Europe", "Oceania"];
  public selectedRegion?: Region;

  constructor(
    private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
    this.countries = this.countriesService.cacheStore.byRegion.countries;
  }

  searchByRegion(region: Region) {
    this.selectedRegion = region;
    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
      console.log(this.countries);

    });
  }

}
