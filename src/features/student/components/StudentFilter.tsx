import { Box, Grid, MenuItem, Select, Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';

export interface StudentFiltersProps {
   filter: ListParams;
   cityList: City[];

   onFilterChange?: (newFilter: ListParams) => void;
   onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters(props: StudentFiltersProps) {
   const { filter, onSearchChange, onFilterChange, cityList } = props;
   const searchRef = useRef<HTMLInputElement>(null);

   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!onSearchChange) return;

      const newFilter: ListParams = {
         ...filter, // old filter
         name_like: e.target.value,
         _page: 1, // reset page
      };

      onSearchChange(newFilter);
   };

   const handleCityChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
      if (!onFilterChange) return;

      const newFilter: ListParams = {
         ...filter,
         _page: 1,
         city: e.target.value || undefined,
      };
      onFilterChange(newFilter);
   };

   const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
      if (!onFilterChange) return;

      const value = e.target.value;
      const [_sort, _order] = (value as string).split('.');
      const newFilter: ListParams = {
         ...filter,
         _sort: _sort || undefined,
         _order: (_order as 'asc' | 'desc') || undefined,
      };
      onFilterChange(newFilter);
   };

   const handleClearFilter = () => {
      if (!onFilterChange) return;

      const newFilter: ListParams = {
         ...filter,
         _page: 1,
         _sort: undefined,
         _order: undefined,
         city: undefined,
         name_like: undefined,
      };
      onFilterChange(newFilter);

      if (searchRef.current) {
         searchRef.current.value = '';
      }
   };

   return (
      <Box>
         {/* Search */}
         <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
               <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="searchByName">Search by name</InputLabel>
                  <OutlinedInput
                     id="searchByName"
                     label="Search by name"
                     endAdornment={<Search />}
                     defaultValue={filter.name_like}
                     onChange={handleSearchChange}
                     inputRef={searchRef}
                  />
               </FormControl>
            </Grid>
         </Grid>
         <br />
         {/* City filter */}
         <Grid item xs={12} md={6} lg={3}>
            <FormControl variant="outlined" size="small" fullWidth>
               <InputLabel id="filterByCity">Filter by city</InputLabel>
               <Select
                  labelId="filterByCity"
                  value={filter.city || ''}
                  onChange={handleCityChange}
                  label="Filter by city"
               >
                  <MenuItem value="">
                     <em>All</em>
                  </MenuItem>

                  {cityList.map((city) => (
                     <MenuItem key={city.code} value={city.code}>
                        {city.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Grid>
         <br />
         {/* Sort */}
         <Grid item xs={12} md={6} lg={2}>
            <FormControl variant="outlined" size="small" fullWidth>
               <InputLabel id="sortBy">Sort</InputLabel>
               <Select
                  labelId="sortBy"
                  value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                  onChange={handleSortChange}
                  label="Sort"
               >
                  <MenuItem value="">
                     <em>No sort</em>
                  </MenuItem>

                  <MenuItem value="name.asc">Name ASC</MenuItem>
                  <MenuItem value="name.desc">Name DESC</MenuItem>
                  <MenuItem value="mark.asc">Mark ASC</MenuItem>
                  <MenuItem value="mark.desc">Mark DESC</MenuItem>
               </Select>
            </FormControl>
         </Grid>
         <br />
         <Grid item xs={12} md={6} lg={1}>
            <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
               Clear
            </Button>
         </Grid>
      </Box>
   );
}
