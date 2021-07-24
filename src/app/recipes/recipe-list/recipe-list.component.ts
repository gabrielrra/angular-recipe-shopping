import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() onRecipeItemSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Chicken Parmigiana',
      'Delicious fried chicken with tomato sauce and cheese',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-202102-airfryerchickenparm-180-ls-1612561654.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*'
    ),
    new Recipe(
      'Cacio ao Pepe',
      'Simple yet complex pasta',
      'https://img.itdg.com.br/tdg/images/blog/uploads/2018/09/espaguete-cacio-e-pepe.jpg?w=1200'
    ),
  ];

  constructor() {}

  ngOnInit(): void {
    this.onRecipeItemSelected.emit(this.recipes[0]);
  }

  showRecipeDetails(recipe: Recipe) {
    this.onRecipeItemSelected.emit(recipe);
  }
}
