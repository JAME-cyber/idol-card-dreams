
import { useCallback, useMemo } from 'react';
import { useCart } from '@/contexts/CartContext';

export const useOptimizedCart = () => {
  const { items, addItem, removeItem, clearCart, updateQuantity } = useCart();

  const totalItems = useMemo(() => {
    return items.length;
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.price, 0);
  }, [items]);

  const optimizedAddItem = useCallback((item: any) => {
    addItem(item);
  }, [addItem]);

  const optimizedRemoveItem = useCallback((id: string) => {
    removeItem(id);
  }, [removeItem]);

  return {
    items,
    totalItems,
    totalPrice,
    addItem: optimizedAddItem,
    removeItem: optimizedRemoveItem,
    clearCart,
    updateQuantity,
  };
};
