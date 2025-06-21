
import { lazy, ComponentType } from 'react';

export const useLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) => {
  return lazy(importFn);
};

// Pré-chargement des routes critiques
export const preloadRoute = (importFn: () => Promise<any>) => {
  const componentImport = importFn();
  return componentImport;
};
