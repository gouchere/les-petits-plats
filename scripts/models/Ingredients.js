export class Ingredients{
    constructor(data, recipes){
        this.ingredient=data.ingredient;
        this.quantity=data.quantity;
        this.unit=data.unit;
        this.recipes=recipes
    }
}