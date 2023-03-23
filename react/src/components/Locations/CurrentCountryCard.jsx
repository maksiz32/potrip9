import CountryCSS from "./Country.module.css";

import React from 'react';
import {Link} from "react-router-dom";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

function CurrentCountryCard(props) {
  const { UserCountry } = props;

  return (
    <div className={CountryCSS.country_main_card}>
      <h3>Check your country:</h3>
      <Link
        to={`/locations/${UserCountry.id}`}
        style={{textDecoration: 'none'}}
        state={{country: UserCountry}}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={ UserCountry.flag_img }
            title={UserCountry.name_eng}
            component='img'
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {UserCountry.name_eng}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {UserCountry.description}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default CurrentCountryCard;
