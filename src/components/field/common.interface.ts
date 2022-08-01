import { Control, FieldPath, RegisterOptions } from 'react-hook-form';

export interface ControlledCommons<
  TFieldValues,
  TContext,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TFieldName;
  control: Control<TFieldValues, TContext>;
  rules: Omit<
    RegisterOptions<TFieldValues, TFieldName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}
