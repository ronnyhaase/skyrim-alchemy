import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { cn } from "cn";

import { useSearch } from "@/components/search";

export type ItemKind = "effect" | "ingredient";

type ItemReference = {
	id: string;
	kind: ItemKind;
};

type ItemContextValue = {
	highlightedItem: ItemReference | null;
	isItemPinned: (id: string, kind: ItemKind) => boolean;
	setHighlightedItem: (item: ItemReference | null) => void;
	togglePinnedItem: (item: ItemReference) => void;
};

const ItemContext = createContext<ItemContextValue | null>(null);

function getItemKey({ id, kind }: ItemReference) {
	return `${kind}:${id}`;
}

export function usePinnedItems() {
	const context = useContext(ItemContext);

	if (!context) {
		throw new Error("usePinnedItems must be used within an ItemProvider.");
	}

	return {
		isItemPinned: context.isItemPinned,
		togglePinnedItem: context.togglePinnedItem,
	};
}

export function useItemPin(id: string, kind: ItemKind) {
	const { isItemPinned, togglePinnedItem } = usePinnedItems();
	const item = { id, kind };

	return {
		isPinned: isItemPinned(item.id, item.kind),
		togglePinned: () => togglePinnedItem(item),
	};
}

type ItemProviderProps = {
	children: ReactNode;
};

export function ItemProvider({ children }: ItemProviderProps) {
	const [highlightedItem, setHighlightedItem] =
		useState<ItemReference | null>(null);
	const [pinnedItemKeys, setPinnedItemKeys] = useState<Set<string>>(
		new Set(),
	);
	const isItemPinned = useCallback(
		(id: string, kind: ItemKind) =>
			pinnedItemKeys.has(getItemKey({ id, kind })),
		[pinnedItemKeys],
	);

	const togglePinnedItem = useCallback((item: ItemReference) => {
		setPinnedItemKeys((currentPinnedItemKeys) => {
			const itemKey = getItemKey(item);
			const nextPinnedItemKeys = new Set(currentPinnedItemKeys);

			if (nextPinnedItemKeys.has(itemKey)) {
				nextPinnedItemKeys.delete(itemKey);
			} else {
				nextPinnedItemKeys.add(itemKey);
			}

			return nextPinnedItemKeys;
		});
	}, []);

	const value = useMemo(
		() => ({
			highlightedItem,
			isItemPinned,
			setHighlightedItem,
			togglePinnedItem,
		}),
		[highlightedItem, isItemPinned, togglePinnedItem],
	);

	return (
		<ItemContext.Provider value={value}>{children}</ItemContext.Provider>
	);
}

type ItemProps = {
	children?: ReactNode;
	className?: string;
	id: string;
	kind: ItemKind;
	name: string;
};

function itemsAreEqual(item: ItemReference | null, other: ItemReference) {
	return item?.kind === other.kind && item.id === other.id;
}

export function Item({ children, className, id, kind, name }: ItemProps) {
	const context = useContext(ItemContext);
	const { setSearchTerm } = useSearch();

	if (!context) {
		throw new Error("Item must be used within an ItemProvider.");
	}

	const item = { id, kind };
	const isHighlighted = itemsAreEqual(context.highlightedItem, item);

	return (
		<button
			className={cn(
				"-mx-1 inline rounded-sm px-1 text-left text-inherit transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring",
				isHighlighted && "bg-primary text-primary-foreground",
				className,
			)}
			onClick={() => setSearchTerm(name)}
			onMouseEnter={() => context.setHighlightedItem(item)}
			onMouseLeave={() => {
				if (itemsAreEqual(context.highlightedItem, item)) {
					context.setHighlightedItem(null);
				}
			}}
			type="button"
		>
			{children ?? name}
		</button>
	);
}
