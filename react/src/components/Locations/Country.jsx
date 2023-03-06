function componentDidMount() {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  });
}

export default function Country() {
  return (
    <div>
      Country
    </div>
  )
}
