import { Box, Grid, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import React, { ChangeEvent } from 'react';

export interface StudentFiltersProps {
   filter: ListParams;
   cityList: City[];

   onFilterChange?: (newFilter: ListParams) => void;
   onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters(props: StudentFiltersProps) {
   const { filter, onSearchChange, onFilterChange, cityList } = props;

   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!onSearchChange) return;

      const newFilter: ListParams = {
         ...filter,
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
      </Box>
   );
}
