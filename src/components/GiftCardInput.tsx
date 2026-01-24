import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Gift, X, Loader2, Check } from 'lucide-react';

const GiftCardInput = () => {
  const { appliedGiftCard, applyGiftCard, removeGiftCard } = useCart();
  const { t } = useLanguage();
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleValidateCode = async () => {
    if (!code.trim()) {
      toast({
        title: t('giftCard.errorTitle'),
        description: t('giftCard.enterCode'),
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);

    try {
      const { data, error } = await supabase.functions.invoke('validate-gift-card', {
        body: { code: code.trim(), action: 'validate' },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.valid) {
        applyGiftCard(data.code, data.value);
        setCode('');
        toast({
          title: t('giftCard.successTitle'),
          description: `${t('giftCard.applied')} -€${data.value}`,
        });
      } else {
        toast({
          title: t('giftCard.errorTitle'),
          description: data.error || t('giftCard.invalidCode'),
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error validating gift card:', error);
      toast({
        title: t('giftCard.errorTitle'),
        description: error.message || t('giftCard.validationError'),
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  if (appliedGiftCard) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">
            {t('giftCard.codeApplied')}: <span className="font-mono">{appliedGiftCard.code}</span>
          </span>
          <span className="text-green-600 font-bold">-€{appliedGiftCard.value}</span>
        </div>
        <button
          onClick={removeGiftCard}
          className="p-1 hover:bg-green-100 rounded-full transition-colors"
          aria-label={t('giftCard.remove')}
        >
          <X className="w-4 h-4 text-green-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-stone-black">
        <Gift className="w-4 h-4 text-korean-gold" />
        {t('giftCard.haveCode')}
      </label>
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="STONE-XXXXXXXX"
          className="flex-1 font-mono text-sm uppercase"
          disabled={isValidating}
        />
        <button
          onClick={handleValidateCode}
          disabled={isValidating || !code.trim()}
          className="px-4 py-2 bg-korean-gold text-white rounded-lg hover:bg-korean-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isValidating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            t('giftCard.apply')
          )}
        </button>
      </div>
    </div>
  );
};

export default GiftCardInput;
