import CountryCSS from './Country.module.css';

import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import {TokenNames} from "../../utils/Constants";
import CountrySelect from "../Units/CountrySelect";
import CurrentCountryCard from "./CurrentCountryCard";
import Preload from "../Units/UI/Preload";

export default function Country() {
  const [coordinates, _setCoordinates] = useState({});
  const [UserCountry, setUserCountry] = useState({});
  const [countries, setCountries] = useState({});
  const [loading, setLoading] = useState(true);

  const setCoordinates = (Coordinates) => {
    _setCoordinates(Coordinates);
    if (Coordinates) {
      sessionStorage.setItem(TokenNames.USER_GPS_NAME, JSON.stringify(Coordinates));
    } else {
      sessionStorage.removeItem(TokenNames.USER_GPS_NAME);
    }
  }

  const getCoordinatesFromStorage = () => {
    return JSON.parse(sessionStorage.getItem(TokenNames.USER_GPS_NAME)) || {};
  }

  const getCountries = () => {
    const Data = getCoordinatesFromStorage() || {};

    axiosClient.get('/countries', {
      params: {
        latitude: Data.latitude,
        longitude: Data.longitude,
      }
    })
      .then(({data}) => {
        setUserCountry(data.currentCountry);
        setCountries(data.countries);
      })
      .catch((error) => {
        // ToDo: make myself alerts
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    if (!getCoordinatesFromStorage().length) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
    setTimeout(() => {
      getCountries();
    }, 1)
  }, []);

  return (
    <div
      style={{height:'85vh'}}
      className="d-flex justify-content-center align-items-center"
    >
      {loading
        ?
        <Preload />
        :
        <main className={CountryCSS.country_main}>
          {UserCountry && (<CurrentCountryCard UserCountry={UserCountry} />)}
          {countries && (
            <div>
              <h3>{UserCountry && ('Or ')}Check any country:</h3>
              <CountrySelect countries={countries}/>
            </div>
          )}
        </main>
      }
    </div>
  )
}
