import { SkyrimAlchemy } from "@/components/skyrim-alchemy";
import effects from "../../data/effect-list.json";
import ingredients from "../../data/ingredient-list.json";

export default function Home() {
  return <SkyrimAlchemy effects={effects} ingredients={ingredients} />;
}
