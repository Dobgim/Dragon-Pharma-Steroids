import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Product } from '../lib/products-data';

export type Warehouse = 'int' | 'usa';

export interface CartItem {
  product: Product;
  quantity: number;
  warehouse: Warehouse;
  unitPrice: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; warehouse: Warehouse } }
  | { type: 'REMOVE_ITEM'; payload: { id: number; warehouse: Warehouse } }
  | { type: 'UPDATE_QTY'; payload: { id: number; warehouse: Warehouse; qty: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CART' };

function getPrice(product: Product, warehouse: Warehouse): number {
  return warehouse === 'usa' ? product.usaPrice : product.intPrice;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, warehouse } = action.payload;
      const existing = state.items.find(
        i => i.product.id === product.id && i.warehouse === warehouse
      );
      const unitPrice = getPrice(product, warehouse);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map(i =>
            i.product.id === product.id && i.warehouse === warehouse
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { product, quantity: 1, warehouse, unitPrice }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.product.id === action.payload.id && i.warehouse === action.payload.warehouse)
        ),
      };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.payload.id && i.warehouse === action.payload.warehouse
            ? { ...i, quantity: Math.max(1, action.payload.qty) }
            : i
        ),
      };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  addItem: (product: Product, warehouse: Warehouse) => void;
  removeItem: (id: number, warehouse: Warehouse) => void;
  updateQty: (id: number, warehouse: Warehouse, qty: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'dp_cart';

function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...JSON.parse(raw), isOpen: false };
  } catch { /* ignore */ }
  return { items: [], isOpen: false };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
  }, [state.items]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      state,
      addItem: (product, warehouse) => dispatch({ type: 'ADD_ITEM', payload: { product, warehouse } }),
      removeItem: (id, warehouse) => dispatch({ type: 'REMOVE_ITEM', payload: { id, warehouse } }),
      updateQty: (id, warehouse, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, warehouse, qty } }),
      toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
      openCart: () => dispatch({ type: 'OPEN_CART' }),
      closeCart: () => dispatch({ type: 'CLOSE_CART' }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
