import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent {

  public country?: Country;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) {}

  ngOnInit(): void {
    // this.activatedRouter.params.subscribe(({ id }) => {
    //   this.countriesService
    //     .searchCountryByAlphaCode(id)
    //     .subscribe((country) => {
    //       console.log({ country });
    //     });
    // });

    this.activatedRouter.params
      .pipe(
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe( country => {
        if(!country) return this.router.navigate(['']);
        this.country = country;
        return;
      })

  }
}
