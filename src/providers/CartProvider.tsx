import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";
import type { ShopifyProduct, ShopifyVariant } from "@/src/services/shopify";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface CartItem {
  lineId: string; // unique key = variantId + productId
  productId: string;
  variantId: string;
  handle: string;
  title: string;
  variantTitle: string;
  imageUrl?: string;
  price: number;
  currencyCode: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; lineId: string }
  | { type: "UPDATE_QUANTITY"; lineId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_DRAWER" };

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  currencyCode: string;
  addToCart: (product: ShopifyProduct, variant: ShopifyVariant, quantity?: number) => void;
  removeFromCart: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
};

// ─── Reducer ───────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.lineId === action.payload.lineId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.lineId === action.payload.lineId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.lineId !== action.lineId) };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.lineId !== action.lineId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.lineId === action.lineId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_DRAWER":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

// ─── Context ───────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const addToCart = useCallback(
    (product: ShopifyProduct, variant: ShopifyVariant, quantity = 1) => {
      const lineId = `${product.id}_${variant.id}`;
      dispatch({
        type: "ADD_ITEM",
        payload: {
          lineId,
          productId: product.id,
          variantId: variant.id,
          handle: product.handle,
          title: product.title,
          variantTitle: variant.title,
          imageUrl: product.images[0]?.url,
          price: parseFloat(variant.price.amount),
          currencyCode: variant.price.currencyCode,
          quantity,
        },
      });
    },
    []
  );

  const removeFromCart = useCallback((lineId: string) => {
    dispatch({ type: "REMOVE_ITEM", lineId });
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", lineId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const toggleDrawer = useCallback(() => {
    dispatch({ type: "TOGGLE_DRAWER" });
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const currencyCode = state.items[0]?.currencyCode ?? "INR";

    return {
      items: state.items,
      isOpen: state.isOpen,
      itemCount,
      subtotal,
      currencyCode,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleDrawer,
    };
  }, [state, addToCart, removeFromCart, updateQuantity, clearCart, toggleDrawer]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
