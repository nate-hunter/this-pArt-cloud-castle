import React, { useState } from 'react';
import ReactMapGL, {Source, Layer, Marker} from 'react-map-gl';
// import {Circle} from '@material-ui/icons';
import CircleIcon from '@material-ui/icons/Circle';


const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf',
  }
};

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2VvLW5qaCIsImEiOiJja2tlbm0wMG4wYTZxMnRvOWgzMW40MnZrIn0.THEKmBrpYOVAQ-15u4bEMA';

const MapExample = () => {
  const [viewPort, setViewPort] = useState({ 
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -121.4376,
    zoom: 8,
  });

  return (
    <div>
      <h2>Map...</h2>

      <ReactMapGL 
        {...viewPort}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={newxtViewport => setViewPort(newxtViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {/* <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source> */}

        <Marker
          latitude={37.961632}
          longitude={-121.275604}
          offsetTop={-10}
          offsetLeft={-20}
        >
          <CircleIcon />
        </Marker>

      </ReactMapGL>
    </div>
  );
};

export default MapExample;
