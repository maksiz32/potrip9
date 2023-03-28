import React from 'react';
import {Autocomplete, Box, FormControl, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import CountryCSS from "../Locations/Country.module.css";

function CountrySelect(props) {
  return (
    <FormControl fullWidth>
      <Autocomplete
        id="country-select"
        sx={{ width: 300 }}
        options={props.countries}
        autoHighlight
        getOptionLabel={(Country) => Country.name_eng}
        renderOption={(props, Country) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <Link
              to={`/locations/${Country.id}`}
              style={{textDecoration: 'none'}}
              state={{country: Country}}
            >
              {Country.name_eng} ({Country.country_code})
              <img
                loading="lazy"
                width="20"
                src={Country.flag_img}
                className={CountryCSS.country_main_check__img}
              />
            </Link>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'potrip-country', // disable autocomplete and autofill
            }}
          />
        )}
      />
    </FormControl>
  );
}

export default CountrySelect;
