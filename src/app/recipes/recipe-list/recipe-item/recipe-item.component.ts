import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem;
  @Input() id;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  showRecipeDetails() {
    this.recipeService.selectedRecipe.next(this.recipeItem);
  }
}
