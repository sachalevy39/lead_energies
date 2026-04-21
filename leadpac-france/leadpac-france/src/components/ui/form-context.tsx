import { createContext } from 'react';

export const FormFieldContext = createContext<Record<string, any>>({} as any);

export const FormItemContext = createContext<string>('');

export const FormLabelContext = createContext<{ formItemId: string; error?: any }>({} as any);

export const FormMessageContext = createContext<{ formMessageId: string; error?: any }>({} as any);
