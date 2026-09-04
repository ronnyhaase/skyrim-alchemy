"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Effect, Ingredient } from "@/types";

type SkyrimAlchemyProps = {
	effects: Effect[];
	ingredients: Ingredient[];
};

export function SkyrimAlchemy({ effects, ingredients }: SkyrimAlchemyProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const normalizedSearchTerm = searchTerm.trim().toLowerCase();

	const searchResults = useMemo(() => {
		if (!normalizedSearchTerm) {
			return effects.map((effect) => ({
				effect,
				ingredients: ingredients.filter((ingredient) =>
					ingredient.effects.includes(effect.id),
				),
			}));
		}

		return effects
			.map((effect) => {
				const ingredientsWithEffect = ingredients.filter((ingredient) =>
					ingredient.effects.includes(effect.id),
				);

				const effectMatches = effect.name
					.toLowerCase()
					.includes(normalizedSearchTerm);

				const matchingIngredients = ingredientsWithEffect.filter(
					(ingredient) =>
						ingredient.name
							.toLowerCase()
							.includes(normalizedSearchTerm),
				);

				if (!effectMatches && matchingIngredients.length === 0) {
					return null;
				}

				return {
					effect,
					ingredients: effectMatches
						? ingredientsWithEffect
						: matchingIngredients,
				};
			})
			.filter((row) => row !== null);
	}, [effects, ingredients, normalizedSearchTerm]);

	return (
		<>
			<Input
				className="my-4"
				placeholder="Search effects and ingredients..."
				onChange={(event) => setSearchTerm(event.target.value)}
				value={searchTerm}
			/>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-1/4">Effect</TableHead>
						<TableHead className="w-3/4">Ingredients</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{searchResults.length === 0 ? (
						<TableRow>
							<TableCell
								className="h-48 text-center whitespace-normal"
								colSpan={2}
							>
								<p className="text-center text-muted-foreground text-2xl">
									No ingredient or effect matched &quot;
									{searchTerm}
									&quot;.
								</p>
							</TableCell>
						</TableRow>
					) : (
						searchResults.map((row) => (
							<TableRow key={row.effect.id}>
								<TableHead>{row.effect.name}</TableHead>
								<TableCell>
									<ul>
										{row.ingredients.map((ingredient) => (
											<li key={ingredient.id}>
												{ingredient.name}
											</li>
										))}
									</ul>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</>
	);
}
