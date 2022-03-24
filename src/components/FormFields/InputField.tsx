import { TextField } from '@material-ui/core';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
   label?: string;
   name: string;
   control: Control<any>;
}

export function InputField(props: InputFieldProps) {
   const { label, name, control, ...inputProps } = props;
   const {
      field: { value, onChange, onBlur, ref },
      fieldState: { invalid, error },
   } = useController({
      name,
      control,
   });

   return (
      <TextField
         fullWidth
         size="small"
         margin="normal"
         variant="outlined"
         label={label}
         value={value}
         onChange={onChange}
         onBlur={onBlur}
         inputRef={ref}
         error={invalid}
         helperText={error?.message}
         inputProps={inputProps}
      />
   );
}
