import type effects from "../data/effect-list.json";
import type ingredients from "../data/ingredient-list.json";

export type Effect = (typeof effects)[number];
export type Ingredient = (typeof ingredients)[number];
