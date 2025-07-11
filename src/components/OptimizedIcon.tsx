
import React, { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const fallback = <div className="w-5 h-5 bg-stone-beige/20 rounded animate-pulse" />;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const OptimizedIcon = React.memo(({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
});

OptimizedIcon.displayName = 'OptimizedIcon';

export default OptimizedIcon;
