import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
// import differenceInMinutes from 'date-fns/difference_in_minutes';

import { withStyles } from "@material-ui/core/styles";
// import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import MapDot from './MapDot';

// NYC:
const INITIAL_VIEWPORT = {
  latitude: 40.730824,
  longitude: -73.997330,
  zoom: 13
}

// HNL:
// const INITIAL_VIEWPORT = {
//   latitude: 21.315603,
//   longitude: -157.858093,
//   zoom: 13
// }

const Map = ({ classes }) => {
  // const mobileSize = useMediaQuery('(max-width: 650px)');

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, [])

  const getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({ 
          ...viewport, 
          latitude, 
          longitude 
        });
        setUserPosition({
          latitude,
          longitude
        })
      })
    }
  }

  const displayDraftPin = (lat, lon) => {
    return (
      <Marker
        latitude={lat}
        longitude={lon}
        // offsetLeft={-19}
        // offsetTop={-37}
      >
        <MapDot size={50} color='#lightsteelblue' />
      </Marker>
    );
  }
  const handleMapClick = ({ lngLat, leftButton }) => {
    console.log('map clicked', lngLat, leftButton)

    return displayDraftPin(lngLat[0], lngLat[1])

  }


  return (
    <div className={classes.root}>
      <ReactMapGL
        width='100vw'
        height='100vh'
        mapStyle='mapbox://styles/mapbox/light-v10'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
        // scrollZoom={!mobileSize}
        {...viewport}
      >
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>

        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            // offsetLeft={-19}
            // offsetTop={-37}
          >
            <MapDot size={50} color='#008E7C' />
          </Marker>
        )}

        {displayDraftPin}


      </ReactMapGL>
    </div>
  );
}

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

// export default Map;
export default withStyles(styles)(Map);
// export default Map;
