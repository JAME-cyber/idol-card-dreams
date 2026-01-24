
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions?: {
    design?: string;
    size?: string;
    supportType?: string;
    frameColor?: string;
    tshirtSize?: string;
    characterCount?: string;
    characterChoices?: string;
    kdramaChoices?: string;
    recipientName?: string;
    includesPhysicalCard?: boolean;
    giftCardCode?: string;
    uploadedFiles?: {
      name: string;
      size: number;
      type: string;
      dataUrl: string;
    }[];
  };
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  shippingCost: number;
  appliedGiftCard: {
    code: string;
    value: number;
  } | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_GIFT_CARD'; payload: { code: string; value: number } }
  | { type: 'REMOVE_GIFT_CARD' };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  shippingCost: 5.50,
  appliedGiftCard: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: newItems, total, itemCount };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: newItems, total, itemCount };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: newItems, total, itemCount };
    }

    case 'APPLY_GIFT_CARD': {
      return { ...state, appliedGiftCard: action.payload };
    }

    case 'REMOVE_GIFT_CARD': {
      return { ...state, appliedGiftCard: null };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyGiftCard: (code: string, value: number) => void;
  removeGiftCard: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const applyGiftCard = (code: string, value: number) => {
    dispatch({ type: 'APPLY_GIFT_CARD', payload: { code, value } });
  };

  const removeGiftCard = () => {
    dispatch({ type: 'REMOVE_GIFT_CARD' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyGiftCard,
        removeGiftCard,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
