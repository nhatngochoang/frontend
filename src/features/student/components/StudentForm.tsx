import { Box, Button } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import { Student } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface StudentFormProps {
   initialValues?: Student;
   onSubmit?: (formValues: Student) => void;
}

export default function StudentForm(props: StudentFormProps) {
   const { initialValues, onSubmit } = props;
   const { control, handleSubmit } = useForm<Student>({
      defaultValues: initialValues,
   });

   const handleFormSubmit = (formValues: Student) => {
      console.log('Submit:', formValues);
   };
   return (
      <Box maxWidth={400}>
         <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputField name="name" control={control} label="Full Name" />
            <InputField name="age" control={control} label="Age" type="number" />
            <InputField name="mark" control={control} label="Mark" type="number" />
            <InputField name="gender" control={control} label="Gender" />
            <InputField name="city" control={control} label="City" />

            <Box mt={3}>
               <Button type="submit" variant="contained" color="primary">
                  Save
               </Button>
            </Box>
         </form>
      </Box>
   );
}
