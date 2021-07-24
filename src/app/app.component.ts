import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFeature: 'recipe' | 'shopping' = "recipe"

  onNavigate(feature: 'recipe' | 'shopping') {
    this.selectedFeature = feature
  }
}
