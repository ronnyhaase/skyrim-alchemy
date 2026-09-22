import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useMemo,
	useState,
} from "react";

import { normalizeSearchTerm } from "@/utils/search";

type SearchContextValue = {
	normalizedSearchTerm: string;
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextValue | null>(null);

type SearchProviderProps = {
	children: ReactNode;
};

export function SearchProvider({ children }: SearchProviderProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const value = useMemo(
		() => ({
			normalizedSearchTerm: normalizeSearchTerm(searchTerm),
			searchTerm,
			setSearchTerm,
		}),
		[searchTerm, setSearchTerm],
	);

	return (
		<SearchContext.Provider value={value}>{children}</SearchContext.Provider>
	);
}

export function useSearch() {
	const context = useContext(SearchContext);

	if (!context) {
		throw new Error("useSearch must be used within a SearchProvider.");
	}

	return context;
}
