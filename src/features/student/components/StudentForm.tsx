import { Box, Button } from '@material-ui/core';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { Student } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import { selectCityOptions } from '../../city/citySlice';

export interface StudentFormProps {
   initialValues?: Student;
   onSubmit?: (formValues: Student) => void;
}

export default function StudentForm(props: StudentFormProps) {
   const { initialValues, onSubmit } = props;
   const { control, handleSubmit } = useForm<Student>({
      defaultValues: initialValues,
   });
   const cityOptions = useAppSelector(selectCityOptions);

   const handleFormSubmit = (formValues: Student) => {
      console.log('Submit:', formValues);
   };
   return (
      <Box maxWidth={400}>
         <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputField name="name" control={control} label="Full Name" />
            <InputField name="age" control={control} label="Age" type="number" />
            <InputField name="mark" control={control} label="Mark" type="number" />
            <RadioGroupField
               name="gender"
               control={control}
               label="Gender"
               options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
               ]}
            />
            <SelectField name="city" control={control} label="City" options={cityOptions} />

            <Box mt={3}>
               <Button type="submit" variant="contained" color="primary">
                  Save
               </Button>
            </Box>
         </form>
      </Box>
   );
}
