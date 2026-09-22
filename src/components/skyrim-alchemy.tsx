"use client";

import { useMemo, useState } from "react";
import {
	CircleXIcon,
	LeafIcon,
	SearchIcon,
	SquareSplitHorizontalIcon,
	WandSparklesIcon,
} from "lucide-react";

import { EffectsView } from "@/components/effects-view";
import { IngredientsView } from "@/components/ingredients-view";
import { ItemProvider } from "@/components/item";
import { SearchProvider, useSearch } from "@/components/search";
import { SplitView } from "@/components/split-view";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { Effect, Ingredient } from "@/types";
import {
	searchByEffect,
	searchByIngredient,
} from "@/utils/search";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "./ui/input-group";

type SkyrimAlchemyProps = {
	effects: Effect[];
	ingredients: Ingredient[];
};

type AlchemyView = "effect" | "ingredient" | "split";

export function SkyrimAlchemy({ effects, ingredients }: SkyrimAlchemyProps) {
	return (
		<SearchProvider>
			<ItemProvider>
				<SkyrimAlchemyContent effects={effects} ingredients={ingredients} />
			</ItemProvider>
		</SearchProvider>
	);
}

function SkyrimAlchemyContent({ effects, ingredients }: SkyrimAlchemyProps) {
	const { normalizedSearchTerm, searchTerm, setSearchTerm } = useSearch();
	const [activeView, setActiveView] = useState<AlchemyView>("effect");

	const effectSearchResults = useMemo(() => {
		return searchByEffect(effects, ingredients, normalizedSearchTerm);
	}, [effects, ingredients, normalizedSearchTerm]);

	const ingredientSearchResults = useMemo(() => {
		return searchByIngredient(effects, ingredients, normalizedSearchTerm);
	}, [effects, ingredients, normalizedSearchTerm]);

	return (
		<>
			<header>
				<InputGroup className="my-4 [--radius:9999px] bg-background">
					<InputGroupInput
						placeholder="Search effects and ingredients..."
						onChange={(event) => setSearchTerm(event.target.value)}
						value={searchTerm}
					/>
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
					<InputGroupAddon align="inline-end">
						<InputGroupButton
							onClick={() => {
								setSearchTerm("");
							}}
						>
							<CircleXIcon />
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
				<ButtonGroup className="mb-4">
					<Button
						aria-pressed={activeView === "effect"}
						onClick={() => setActiveView("effect")}
						type="button"
						variant={
							activeView === "effect" ? "default" : "outline"
						}
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
			</header>
			<main>
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
			</main>
			<footer className="my-4 text-center text-sm">
				Copyright &copy; Ronny Haase, 2026
			</footer>
		</>
	);
}
