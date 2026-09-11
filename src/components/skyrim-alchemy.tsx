"use client";

import { useMemo, useState } from "react";
import {
	LeafIcon,
	SquareSplitHorizontalIcon,
	WandSparklesIcon,
} from "lucide-react";

import { EffectsView } from "@/components/effects-view";
import { IngredientsView } from "@/components/ingredients-view";
import { SplitView } from "@/components/split-view";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import type { Effect, Ingredient } from "@/types";
import {
	normalizeSearchTerm,
	searchByEffect,
	searchByIngredient,
} from "@/utils/search";

type SkyrimAlchemyProps = {
	effects: Effect[];
	ingredients: Ingredient[];
};

type AlchemyView = "effect" | "ingredient" | "split";

export function SkyrimAlchemy({ effects, ingredients }: SkyrimAlchemyProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeView, setActiveView] = useState<AlchemyView>("effect");
	const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

	const effectSearchResults = useMemo(() => {
		return searchByEffect(effects, ingredients, normalizedSearchTerm);
	}, [effects, ingredients, normalizedSearchTerm]);

	const ingredientSearchResults = useMemo(() => {
		return searchByIngredient(effects, ingredients, normalizedSearchTerm);
	}, [effects, ingredients, normalizedSearchTerm]);

	return (
		<>
			<Input
				className="my-4"
				placeholder="Search effects and ingredients..."
				onChange={(event) => setSearchTerm(event.target.value)}
				value={searchTerm}
			/>
			<ButtonGroup className="mb-4">
				<Button
					aria-pressed={activeView === "effect"}
					onClick={() => setActiveView("effect")}
					type="button"
					variant={activeView === "effect" ? "default" : "outline"}
				>
					<WandSparklesIcon />
					By Effect
				</Button>
				<Button
					aria-pressed={activeView === "ingredient"}
					onClick={() => setActiveView("ingredient")}
					type="button"
					variant={
						activeView === "ingredient" ? "default" : "outline"
					}
				>
					<LeafIcon />
					By Ingredient
				</Button>
				<Button
					aria-pressed={activeView === "split"}
					onClick={() => setActiveView("split")}
					type="button"
					variant={activeView === "split" ? "default" : "outline"}
				>
					<SquareSplitHorizontalIcon />
					Split-View
				</Button>
			</ButtonGroup>
			<div>
				{activeView === "effect" ? (
					<EffectsView
						normalizedSearchTerm={normalizedSearchTerm}
						rows={effectSearchResults}
						searchTerm={searchTerm}
					/>
				) : null}
				{activeView === "ingredient" ? (
					<IngredientsView
						normalizedSearchTerm={normalizedSearchTerm}
						rows={ingredientSearchResults}
						searchTerm={searchTerm}
					/>
				) : null}
				{activeView === "split" ? (
					<SplitView
						effectRows={effectSearchResults}
						ingredientRows={ingredientSearchResults}
						normalizedSearchTerm={normalizedSearchTerm}
						searchTerm={searchTerm}
					/>
				) : null}
			</div>
		</>
	);
}
