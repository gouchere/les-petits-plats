/* Charge toutes les données à afficher */
import {recipes} from "../../data/recipes.js"
import {Ingredients} from "../models/Ingredients.js"
import {Appareils} from "../models/Appareils.js"
import {Ustensils} from "../models/Ustensils.js"

const ingredients=[];
const appareils=[];
const ustensils=[];
const recettes=[];

let text="";
let text2="";
export function loadData(){
    recipes.forEach(recipe => {
        /* Récupération des ingrédients */
        text=""
        text=text.concat(recipe.name).concat(" ").concat(recipe.description).concat(" ").concat(recipe.appliance);
        text=text.concat(recipe.ingredients.reduce(((previous, current)=> previous.concat(" ").concat(current.ingredient)),""))
        text=text.concat(recipe.ustensils.reduce(((prev,current)=>prev.concat(" ").concat(current)),""))
        recettes.push([recipe.id, text])
        recipe.ingredients.forEach((i)=>{
           const current=getIngredient(i);
           if(current!=null){
                current.recipes.push(recipe.id);
           }else{
               ingredients.push(new Ingredients(i,[recipe.id]))
           }
        })
        /* Récupération des appareils */
        const current_a=getAppareils(recipe.appliance);
        if(current_a!=undefined){
            console.log("find line...")
            current_a.recipes.push(recipe.id);
        }else{
            appareils.push(new Appareils(recipe.appliance,[recipe.id]))
        }
        /* Récupération des ustensils */
        recipe.ustensils.forEach(u=>{
            const current_u=getUstensils(u);
            if(current_u!=null){
                current_u.recipes.push(recipe.id)
            }else{
                ustensils.push(new Ustensils(u,[recipe.id]))
            }
        })
        
    });
    console.log(appareils)
    console.log(ingredients)
}

function getIngredient(ingredient){
    const r=ingredients.find(e=>{
       return e.ingredient===ingredient.ingredient
    })
    return r;
}

function getAppareils(appareil){
    const r=appareils.find((e)=>{
       return e.name===appareil
    })
    return r;
}
function getUstensils(ustensil){
    const r=ustensils.find(e=>{
       return e.name===ustensil
    })
    return r;
}
export {ingredients, appareils, ustensils, recettes}