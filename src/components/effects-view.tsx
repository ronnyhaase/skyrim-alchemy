import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { EffectSearchResult } from "@/utils/search";

type EffectsViewProps = {
	rows: EffectSearchResult[];
	searchTerm: string;
};

export function EffectsView({ rows, searchTerm }: EffectsViewProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-1/4">Effect</TableHead>
					<TableHead className="w-3/4">Ingredients</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.length === 0 ? (
					<TableRow>
						<TableCell className="h-48 text-center whitespace-normal" colSpan={2}>
							<p className="text-center text-muted-foreground text-2xl">
								No ingredient or effect matched &quot;
								{searchTerm}
								&quot;.
							</p>
						</TableCell>
					</TableRow>
				) : (
					rows.map((row) => (
						<TableRow key={row.effect.id}>
							<TableHead>{row.effect.name}</TableHead>
							<TableCell>
								<ul>
									{row.ingredients.map((ingredient) => (
										<li key={ingredient.id}>{ingredient.name}</li>
									))}
								</ul>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
