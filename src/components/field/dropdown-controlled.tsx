import { Dropdown, IDropdownProps, IInputProps } from '@daphaz/hrnet-ui';
import clsx from 'clsx';
import { Controller, FieldPath } from 'react-hook-form';

import s from './styles.module.scss';

import { ControlledCommons } from './common.interface';

export interface DropdownControlledProps<
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
  placeholder: string;
  options: IDropdownProps['options'];
}

export const DropdownControlled = <
  TFieldValues,
  TContext,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  rules,
  classContainer,
  label,
  placeholder,
  options,
}: DropdownControlledProps<TFieldValues, TContext, TFieldName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className={s.block}>
            <span className={s.label}>{label}</span>
            <Dropdown
              options={options}
              placeholder={placeholder}
              classContainer={clsx(classContainer, { [s.isError]: error })}
              onChange={field.onChange}
              bs={false}
            />
            {error && <span className={s.error}>{error.message}</span>}
          </div>
        );
      }}
    />
  );
};
