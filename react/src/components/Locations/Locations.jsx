import * as React from 'react';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";

export default function Locations() {
  const [regions, setRegions] = useState([]);
  const location = useLocation()
  const { country } = location.state
  console.log(country);

  const getAllLocations = (id) => {
    axiosClient.get(`/locations/${id}`, country)
      .then(({data}) => {
        setRegions(data.location_first);
        console.log(data);
    })
      .catch((error) => {
        // ToDo: make myself alerts
        console.log(error);
      })
  }

  useEffect(() => {
    getAllLocations(country.id);
  }, []);

  return (
    <div>
      {regions
      ?
        'Location'
      :
        'No resource data'
      }
    </div>);
}
