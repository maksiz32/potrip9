import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";

export default function Country() {
  const [coordinates, setCoordinates] = useState({});

  const componentDidMount= () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    return coordinates;
  }

  const getCountries = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      axiosClient.put('/countries', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
        .then((Response) => {
          console.log(Response);
        })
        .catch((error) => {
          console.log(error);
        })
    });
  }

  useEffect(() => {
    componentDidMount();
    getCountries();
  }, []);

  return (
    <div>
      {coordinates.latitude && coordinates.longitude && (<span>Country{coordinates.latitude}</span>)}
    </div>
  )
}
