import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  
  //ingredientsChanged = new EventEmitter<Ingredient[]>(); replacing event emitter with subject

    private ingredients: Ingredient[] = [
        new Ingredient('Mango', 100), new Ingredient('Gauva', 10)
      ];

      getIngredients() {
        return this.ingredients.slice();
      }

      getIngredient(index: number) {
        return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice()); //changing emit to next
      }

      addIngredients(ingredients: Ingredient[]) {
        // for(let ingredient of ingredients) {
        //   this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients); //spread operator(...) converts array to list of elements
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}