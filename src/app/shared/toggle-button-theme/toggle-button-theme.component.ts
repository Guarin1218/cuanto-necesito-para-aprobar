import { Component } from '@angular/core';
import { ThemeServiceService } from 'src/app/theme-service.service';

@Component({
  selector: 'app-toggle-button-theme',
  templateUrl: './toggle-button-theme.component.html',
  styleUrls: ['./toggle-button-theme.component.scss']
})
export class ToggleButtonThemeComponent {

  checked: boolean = true;


  constructor(
    private themeService: ThemeServiceService
  ) { }

  switch(event: any) {

    if (event.target.checked) {
      this.changeTheme('lara-light-indigo');

    } else {
      this.changeTheme('lara-dark-indigo');
    }
  }

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }

}
