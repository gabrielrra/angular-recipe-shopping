import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Output() onRecipeClicked = new EventEmitter<Recipe>();
  @Input() recipeItem;
  constructor() {}

  ngOnInit(): void {}
  showRecipeDetails(recipe: Recipe) {
    this.onRecipeClicked.emit(recipe);
  }
}
