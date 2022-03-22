import { Box, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { City, Student } from '../../../models';
import { capitalizeString, getMarkColor } from '../../../utils';

const useStyles = makeStyles((theme) => ({
   table: {},
   edit: {
      marginRight: theme.spacing(1),
   },
}));

export interface StudentTableProps {
   studentList: Student[];
   cityMap: {
      [key: string]: City;
   };
   onEdit?: (student: Student) => void;
   onRemove?: (student: Student) => void;
}

export default function StudentTable(props: StudentTableProps) {
   const { studentList, cityMap, onEdit, onRemove } = props;
   const classes = useStyles();
   // console.log(cityMap);

   return (
      <TableContainer component={Paper}>
         <Table className={classes.table} size="small" aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Mark</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell align="right">Actions</TableCell>
               </TableRow>
            </TableHead>

            <TableBody>
               {studentList.map((student) => (
                  <TableRow key={student.id}>
                     <TableCell width={310}>{student.id}</TableCell>
                     <TableCell>{student.name}</TableCell>
                     <TableCell>{capitalizeString(student.gender)}</TableCell>
                     <TableCell>
                        <Box color={getMarkColor(student.mark)} fontWeight="bold">
                           {student.mark}
                        </Box>
                     </TableCell>
                     <TableCell>{cityMap[student.city]?.name}</TableCell>
                     <TableCell align="right">
                        <Button
                           className={classes.edit}
                           size="small"
                           // variant="contained"
                           color="primary"
                           onClick={() => onEdit?.(student)}
                        >
                           Edit
                        </Button>

                        <Button
                           size="small"
                           // variant="outlined"
                           color="secondary"
                           onClick={() => onRemove?.(student)}
                        >
                           Remove
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
