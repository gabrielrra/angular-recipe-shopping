import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      0,
      'Chicken Parmigiana',
      'Delicious fried chicken with tomato sauce and cheese',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-202102-airfryerchickenparm-180-ls-1612561654.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*',
      [
        new Ingredient('Chicken', 1, 'kg'),
        new Ingredient('Tomato sauce', 100, 'g'),
      ]
    ),
    new Recipe(
      1,
      'Cacio ao Pepe',
      'Simple yet complex pasta',
      'https://img.itdg.com.br/tdg/images/blog/uploads/2018/09/espaguete-cacio-e-pepe.jpg?w=1200',
      [
        new Ingredient('Spaghetti', 100, 'g'),
        new Ingredient('Pecorino cheese', 300, 'g'),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes.slice()[id];
  }
}
