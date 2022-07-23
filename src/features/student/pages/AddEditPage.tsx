import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
   const { studentId } = useParams<{ studentId: string }>();
   const isEdit = Boolean(studentId);
   const [student, setStudent] = useState<Student>();
   const history = useHistory();

   useEffect(() => {
      if (!studentId) return;

      // IFFE
      (async () => {
         try {
            const data: Student = await studentApi.getById(studentId);
            setStudent(data);
         } catch (error) {
            console.log('Failed to fetch student details', error);
         }
      })();
   }, [studentId]);

   const initialValues: Student = {
      name: '',
      age: '',
      mark: '',
      gender: 'male',
      city: '',
      ...student,
   } as Student;

   const handleStudentFormSubmit = async (formValues: Student) => {
      // TODO: Handle submit here, call API  to add/update student
      if (isEdit) {
         await studentApi.update(formValues);
      } else {
         await studentApi.add(formValues);
      }
      // Toast success
      toast.success('Save student successfully!');
      // Redirect back to student list
      history.push('/admin/students');
   };

   return (
      <Box>
         <Link to="/admin/students">
            <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
               <ChevronLeft /> Back to student list
            </Typography>
         </Link>

         <Typography variant="h4">
            {isEdit ? 'Update student info' : 'Add new student'}
            {(!isEdit || Boolean(student)) && (
               <Box mt={3}>
                  <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
               </Box>
            )}
         </Typography>
      </Box>
   );
}
