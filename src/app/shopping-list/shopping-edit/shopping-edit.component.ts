import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() onIngredientAdded = new EventEmitter<Ingredient>()

  constructor() { }

  ngOnInit(): void {
  }
  onAddIngredient(nameInputEl: HTMLInputElement, amountInputEl: HTMLInputElement, unitInputEl: HTMLInputElement){
    let name = nameInputEl.value
    let amount = amountInputEl.value
    let unit = unitInputEl.value
    const newIngredient = new Ingredient(name, Number(amount), unit)
    this.onIngredientAdded.emit(newIngredient)
  }
}
