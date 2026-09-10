"use client";

import { useMemo, useState } from "react";

import { EffectsView } from "@/components/effects-view";
import { Input } from "@/components/ui/input";
import type { Effect, Ingredient } from "@/types";
import { searchByEffect } from "@/utils/search";

type SkyrimAlchemyProps = {
	effects: Effect[];
	ingredients: Ingredient[];
};

export function SkyrimAlchemy({ effects, ingredients }: SkyrimAlchemyProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const searchResults = useMemo(() => {
		return searchByEffect(effects, ingredients, searchTerm);
	}, [effects, ingredients, searchTerm]);

	return (
		<>
			<Input
				className="my-4"
				placeholder="Search effects and ingredients..."
				onChange={(event) => setSearchTerm(event.target.value)}
				value={searchTerm}
			/>
			<EffectsView rows={searchResults} searchTerm={searchTerm} />
		</>
	);
}
