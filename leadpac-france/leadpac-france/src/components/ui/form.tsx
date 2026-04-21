import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/cn';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
  name: TName;
  control?: any;
  render: (props: { field: any }) => React.ReactNode;
}

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <div className="space-y-1">
            <Slot>{props.render({ field })}</Slot>
          </div>
          {fieldState.error && (
            <p className="text-sm text-red-500">
              <span className="font-medium">{fieldState.error.message}</span>
            </p>
          )}
        </div>
      )}
    />
  );
};
FormField.displayName = 'FormField';

// Simple form components for compatibility
const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => (
    <form ref={ref} className={cn('space-y-6', className)} {...props} />
  )
);
Form.displayName = 'Form';

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    return (
      <div ref={ref} id={id} className={cn('space-y-2', className)} {...props} />
    );
  }
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-red-500', className)}
      {...props}
    />
  );
});
FormMessage.displayName = 'FormMessage';

export { Form, FormItem, FormLabel, FormMessage, FormField };
