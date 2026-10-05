"use client";

import { useMemo, useState } from "react";
import {
	ChevronDownIcon,
	CircleXIcon,
	LeafIcon,
	PinOffIcon,
	SearchIcon,
	SquareSplitHorizontalIcon,
	WandSparklesIcon,
} from "lucide-react";

import { EffectsView } from "@/components/effects-view";
import { IngredientsView } from "@/components/ingredients-view";
import { ItemProvider, usePinnedItems } from "@/components/item";
import { SearchProvider, useSearch } from "@/components/search";
import { SplitView } from "@/components/split-view";
import { Button, buttonVariants } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Effect, Ingredient } from "@/types";
import {
	searchByEffect,
	searchByIngredient,
	type SortOption,
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

const sortOptions: { label: string; value: SortOption }[] = [
	{ label: "Name A-Z", value: "name-ascending" },
	{ label: "Name Z-A", value: "name-descending" },
	{ label: "Value Low-High", value: "value-ascending" },
	{ label: "Value High-Low", value: "value-descending" },
];

export function SkyrimAlchemy({ effects, ingredients }: SkyrimAlchemyProps) {
	return (
		<SearchProvider>
			<ItemProvider>
				<SkyrimAlchemyContent
					effects={effects}
					ingredients={ingredients}
				/>
			</ItemProvider>
		</SearchProvider>
	);
}

function SkyrimAlchemyContent({ effects, ingredients }: SkyrimAlchemyProps) {
	const { normalizedSearchTerm, searchTerm, setSearchTerm } = useSearch();
	const { hasPinnedItems, isItemPinned, unpinAllItems } = usePinnedItems();
	const [activeView, setActiveView] = useState<AlchemyView>("effect");
	const [sortOption, setSortOption] = useState<SortOption>("name-ascending");

	const effectSearchResults = useMemo(() => {
		return searchByEffect(
			effects,
			ingredients,
			normalizedSearchTerm,
			sortOption,
			(id) => isItemPinned(id, "effect"),
		);
	}, [effects, ingredients, isItemPinned, normalizedSearchTerm, sortOption]);

	const ingredientSearchResults = useMemo(() => {
		return searchByIngredient(
			effects,
			ingredients,
			normalizedSearchTerm,
			sortOption,
			(id) => isItemPinned(id, "ingredient"),
		);
	}, [effects, ingredients, isItemPinned, normalizedSearchTerm, sortOption]);

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
				<div className="flex flex-wrap items-center justify-between gap-2 mb-4">
					<div className="flex flex-wrap items-center gap-2">
						<ButtonGroup>
							<Button
								aria-pressed={activeView === "effect"}
								onClick={() => setActiveView("effect")}
								type="button"
								variant={
									activeView === "effect"
										? "default"
										: "outline"
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
									activeView === "ingredient"
										? "default"
										: "outline"
								}
							>
								<LeafIcon />
								By Ingredient
							</Button>
							<Button
								aria-pressed={activeView === "split"}
								onClick={() => setActiveView("split")}
								type="button"
								variant={
									activeView === "split"
										? "default"
										: "outline"
								}
							>
								<SquareSplitHorizontalIcon />
								Split-View
							</Button>
						</ButtonGroup>
						<DropdownMenu>
							<DropdownMenuTrigger
								className={buttonVariants({
									variant: "outline",
								})}
								type="button"
							>
								Sort By
								<ChevronDownIcon />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuGroup>
									<DropdownMenuRadioGroup
										onValueChange={(value) =>
											setSortOption(value as SortOption)
										}
										value={sortOption}
									>
										{sortOptions.map((option) => (
											<DropdownMenuRadioItem
												closeOnClick
												key={option.value}
												value={option.value}
											>
												{option.label}
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<Button
						disabled={!hasPinnedItems}
						onClick={unpinAllItems}
						type="button"
						variant="outline"
					>
						<PinOffIcon />
						Unpin all
					</Button>
				</div>
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
				Copyright &copy;{" "}
				<a
					href="https://ronnyhaase.com"
					target="_blank"
					className="text-blue-500 underline"
				>
					Ronny Haase
				</a>
				, 2026
				<br />
				The{" "}
				<a
					href="https://github.com/ronnyhaase/skyrim-alchemy"
					target="_blank"
					className="text-blue-500 underline"
				>
					code of this website
				</a>{" "}
				is open source under GPL v3 or later.
			</footer>
		</>
	);
}
