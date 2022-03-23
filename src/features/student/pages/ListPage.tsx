import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import studentApi from '../../../api/student';
import { ListParams, Student } from '../../../models';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import StudentFilters from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import {
   selectStudenLoading,
   selectStudentFilter,
   selectStudentList,
   selectStudentPagination,
   studentActions,
} from '../studentSlice';

const useStyles = makeStyles((theme) => ({
   root: {
      position: 'relative',
      paddingTop: theme.spacing(1),
   },

   titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',

      marginBottom: theme.spacing(4),
   },

   loading: {
      position: 'absolute',
      top: theme.spacing(-1),
      width: '100%',
   },
}));

export default function ListPage() {
   const match = useRouteMatch();
   const history = useHistory();

   const classes = useStyles();
   const dispatch = useAppDispatch();
   const studentList = useAppSelector(selectStudentList);
   const pagination = useAppSelector(selectStudentPagination);
   const filter = useAppSelector(selectStudentFilter);
   const loading = useAppSelector(selectStudenLoading);
   const cityMap = useAppSelector(selectCityMap);
   const cityList = useAppSelector(selectCityList);

   useEffect(() => {
      dispatch(studentActions.fetchStudentList(filter));
   }, [dispatch, filter]);

   const handlePageChange = (e: any, page: number) => {
      dispatch(
         studentActions.setFilter({
            ...filter,
            _page: page,
         })
      );
   };

   const handleSearchChange = (newFilter: ListParams) => {
      dispatch(studentActions.setFilterWithDebounce(newFilter));
   };

   const handleFilterChange = (newFilter: ListParams) => {
      dispatch(studentActions.setFilter(newFilter));
   };

   const handleRemoveStudent = async (student: Student) => {
      try {
         // Remove student API
         await studentApi.remove(student?.id || '');

         // Trigger to re-fetch student list with current filter
         const newFilter = { ...filter };
         dispatch(studentActions.setFilter(newFilter));
      } catch (error) {
         // Toast error
         console.log('Failed to fetch student', error);
      }
   };

   const handleEditStudent = async (student: Student) => {
      history.push(`${match.url}/${student.id}`);
   };

   return (
      <Box className={classes.root}>
         {loading && <LinearProgress className={classes.loading} />}
         <Box className={classes.titleContainer}>
            <Typography variant="h4">Students</Typography>

            {/* Add */}
            <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
               <Button variant="contained" color="primary">
                  Add new student
               </Button>
            </Link>
         </Box>
         {/* Filter */}
         <Box mb={3}>
            <StudentFilters
               filter={filter}
               cityList={cityList}
               onFilterChange={handleFilterChange}
               onSearchChange={handleSearchChange}
            />
         </Box>
         {/* StudentTable */}
         <StudentTable
            studentList={studentList}
            cityMap={cityMap}
            onEdit={handleEditStudent}
            onRemove={handleRemoveStudent}
         />

         {/* Pagination */}
         <Box my={2} display="flex" justifyContent="center">
            <Pagination
               color="primary"
               count={Math.ceil(pagination._totalRows / pagination._limit)}
               page={pagination?._page}
               onChange={handlePageChange}
            />
         </Box>
      </Box>
   );
}
