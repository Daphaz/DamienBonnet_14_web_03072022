import { IInputProps, Input } from '@daphaz/hrnet-ui';
import { Controller, FieldPath } from 'react-hook-form';

import s from './styles.module.scss';

import { ControlledCommons } from './common.interface';

export interface InputControlledProps<
  TFieldValues,
  TContext,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControlledCommons<TFieldValues, TContext, TFieldName> {
  inputProps?: Omit<
    IInputProps['inputProps'],
    'value' | 'onChange' | 'onBlur' | 'name' | 'ref'
  >;
  classContainer?: string;
  label: string;
}

export const InputControlled = <
  TFieldValues,
  TContext,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  rules,
  inputProps = {},
  classContainer,
  label,
}: InputControlledProps<TFieldValues, TContext, TFieldName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className={s.block} id={name}>
            <span className={s.label}>{label}</span>
            <Input
              fullWidth
              inputProps={{
                onChange: field.onChange,
                onBlur: field.onBlur,
                name: field.name,
                ref: field.ref,
                value:
                  (field.value as
                    | string
                    | number
                    | readonly string[]
                    | undefined) || '',
                ...inputProps,
              }}
              classContainer={classContainer}
              error={error && error.message}
            />
          </div>
        );
      }}
    />
  );
};
