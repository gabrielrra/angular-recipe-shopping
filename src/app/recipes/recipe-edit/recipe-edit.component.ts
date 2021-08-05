import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  units = [];
  id: number;
  editMode: boolean;

  recipeForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.units = this.recipeService.getUnits();
    this.activatedRoute.params.subscribe((params) => {
      this.id = Number(params['id']);
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName,
      recipeImagePath,
      recipeDescription = '';

    let recipeIngredientsForm = new FormArray([]);

    if (this.editMode) {
      const editingRecipe = this.recipeService.getRecipeById(this.id);
      const { name, imagePath, description } = editingRecipe;
      recipeName = name;
      recipeImagePath = imagePath;
      recipeDescription = description;

      if (editingRecipe.ingredients) {
        editingRecipe.ingredients.forEach((ingredient) => {
          recipeIngredientsForm.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
                Validators.min(0),
              ]),
              unit: new FormControl(ingredient.unit, Validators.required),
            })
          );
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredientsForm,
    });
  }

  get ingredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
          Validators.min(0),
        ]),
        unit: new FormControl('', Validators.required),
      })
    );
  }
  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onSubmit() {
    let { name, description, imagePath, ingredients } = this.recipeForm.value;
    ingredients = ingredients.map(({ name, amount, unit }) => {
      return new Ingredient(name, amount, unit);
    });
    const newRecipe = new Recipe(name, description, imagePath, ingredients);
    if (this.editMode) {
      this.recipeService.updateRecipe(newRecipe, this.id);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }
  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
