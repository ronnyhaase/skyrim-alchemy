import { SkyrimAlchemy } from "@/components/skyrim-alchemy";
import effects from "../../data/effect-list.json";
import ingredients from "../../data/ingredient-list.json";

export default function HomePage() {
	return (
		<main className="container mx-auto">
			<SkyrimAlchemy effects={effects} ingredients={ingredients} />
		</main>
	);
}
