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
	return (
		<>
			<Input />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Effect</TableHead>
						<TableHead>Ingredients</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{effects.map((effect) => (
						<TableRow key={effect.id}>
							<TableHead>{effect.name}</TableHead>
							<TableCell>
								<ul>
									{ingredients
										.filter((ingredient) =>
											ingredient.effects.includes(
												effect.id,
											),
										)
										.map((ingredient) => (
											<li key={ingredient.id}>
												{ingredient.name}
											</li>
										))}
								</ul>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
