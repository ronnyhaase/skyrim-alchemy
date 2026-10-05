import type { Effect, Ingredient } from "@/types";

export type EffectSearchResult = {
	effect: Effect;
	ingredients: Ingredient[];
};

export type IngredientSearchResult = {
	ingredient: Ingredient;
	effects: Effect[];
};

export type SortOption =
	| "name-ascending"
	| "name-descending"
	| "value-ascending"
	| "value-descending";

export function normalizeSearchTerm(searchTerm: string) {
	return searchTerm.trim().toLowerCase();
}

export function matchesSearch(value: string, normalizedSearchTerm: string) {
	return value.toLowerCase().includes(normalizedSearchTerm);
}

function getIngredientsForEffect(effect: Effect, ingredients: Ingredient[]) {
	return ingredients.filter((ingredient) =>
		ingredient.effects.includes(effect.id),
	);
}

function getEffectsForIngredient(ingredient: Ingredient, effects: Effect[]) {
	return effects.filter((effect) => ingredient.effects.includes(effect.id));
}

function compareByName(
	firstName: string,
	secondName: string,
	sortOption: SortOption,
) {
	const direction = sortOption === "name-descending" ? -1 : 1;

	return firstName.localeCompare(secondName) * direction;
}

function compareByValue(
	firstValue: number,
	secondValue: number,
	sortOption: SortOption,
) {
	const direction = sortOption === "value-descending" ? -1 : 1;

	return (firstValue - secondValue) * direction;
}

function sortPinnedFirst<Result>(
	results: Result[],
	isPinned: (result: Result) => boolean,
	compareResults: (firstResult: Result, secondResult: Result) => number,
) {
	return [
		...results.filter(isPinned).sort(compareResults),
		...results.filter((result) => !isPinned(result)).sort(compareResults),
	];
}

function compareEffectSearchResults(
	firstResult: EffectSearchResult,
	secondResult: EffectSearchResult,
	sortOption: SortOption,
) {
	if (sortOption === "name-ascending" || sortOption === "name-descending") {
		return compareByName(
			firstResult.effect.name,
			secondResult.effect.name,
			sortOption,
		);
	}

	return compareByValue(
		firstResult.effect.valueAt100,
		secondResult.effect.valueAt100,
		sortOption,
	);
}

function compareIngredientSearchResults(
	firstResult: IngredientSearchResult,
	secondResult: IngredientSearchResult,
	sortOption: SortOption,
) {
	if (sortOption === "name-ascending" || sortOption === "name-descending") {
		return compareByName(
			firstResult.ingredient.name,
			secondResult.ingredient.name,
			sortOption,
		);
	}

	return compareByValue(
		firstResult.ingredient.value,
		secondResult.ingredient.value,
		sortOption,
	);
}

export function searchByEffect(
	effects: Effect[],
	ingredients: Ingredient[],
	normalizedSearchTerm: string,
	sortOption: SortOption,
	isPinned: (id: string) => boolean = () => false,
): EffectSearchResult[] {
	if (!normalizedSearchTerm) {
		return sortPinnedFirst(
			effects.map((effect) => ({
				effect,
				ingredients: getIngredientsForEffect(effect, ingredients),
			})),
			(result) => isPinned(result.effect.id),
			(firstResult, secondResult) =>
				compareEffectSearchResults(
					firstResult,
					secondResult,
					sortOption,
				),
		);
	}

	const results = effects
		.map((effect) => {
			const ingredientsWithEffect = getIngredientsForEffect(
				effect,
				ingredients,
			);
			const effectMatches = matchesSearch(
				effect.name,
				normalizedSearchTerm,
			);
			const effectIsPinned = isPinned(effect.id);
			const matchingIngredients = ingredientsWithEffect.filter(
				(ingredient) =>
					matchesSearch(ingredient.name, normalizedSearchTerm),
			);

			if (
				!effectIsPinned &&
				!effectMatches &&
				matchingIngredients.length === 0
			) {
				return null;
			}

			return {
				effect,
				ingredients:
					effectIsPinned || effectMatches
						? ingredientsWithEffect
						: matchingIngredients,
			};
		})
		.filter((row) => row !== null);

	return sortPinnedFirst(
		results,
		(result) => isPinned(result.effect.id),
		(firstResult, secondResult) =>
			compareEffectSearchResults(firstResult, secondResult, sortOption),
	);
}

export function searchByIngredient(
	effects: Effect[],
	ingredients: Ingredient[],
	normalizedSearchTerm: string,
	sortOption: SortOption,
	isPinned: (id: string) => boolean = () => false,
): IngredientSearchResult[] {
	if (!normalizedSearchTerm) {
		return sortPinnedFirst(
			ingredients.map((ingredient) => ({
				ingredient,
				effects: getEffectsForIngredient(ingredient, effects),
			})),
			(result) => isPinned(result.ingredient.id),
			(firstResult, secondResult) =>
				compareIngredientSearchResults(
					firstResult,
					secondResult,
					sortOption,
				),
		);
	}

	const results = ingredients
		.map((ingredient) => {
			const effectsForIngredient = getEffectsForIngredient(
				ingredient,
				effects,
			);
			const ingredientMatches = matchesSearch(
				ingredient.name,
				normalizedSearchTerm,
			);
			const ingredientIsPinned = isPinned(ingredient.id);
			const matchingEffects = effectsForIngredient.filter((effect) =>
				matchesSearch(effect.name, normalizedSearchTerm),
			);

			if (
				!ingredientIsPinned &&
				!ingredientMatches &&
				matchingEffects.length === 0
			) {
				return null;
			}

			return {
				ingredient,
				effects: effectsForIngredient,
			};
		})
		.filter((row) => row !== null);

	return sortPinnedFirst(
		results,
		(result) => isPinned(result.ingredient.id),
		(firstResult, secondResult) =>
			compareIngredientSearchResults(
				firstResult,
				secondResult,
				sortOption,
			),
	);
}
