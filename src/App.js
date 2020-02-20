import DeckGL, { GeoJsonLayer } from "deck.gl";
import { Power3 } from "gsap";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { Component } from "react";
import MapGL, { FlyToInterpolator } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqcGM0d3U4bTB6dWwzcW04ZHRsbHl0ZWoifQ.X9cvdajtPbs9JDMG-CMDsA";

class App extends Component {
  state = {
    viewport: {
      latitude: 50.92,
      longitude: 11.946,
      zoom: 5.52
    },
    searchResultLayer: null
  };

  mapRef = React.createRef();

  handleViewportChange = viewport => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        ...viewport,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 3000,
        transitionEasing: Power3.easeInOut
      }
    });
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => {
    console.log(event.result);
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    });
  };

  render() {
    const { viewport, searchResultLayer } = this.state;

    return (
      <div style={{ height: "100vh" }}>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            countries={"de"}
            // bbox={[-122.30937, 37.84214, -122.23715, 37.89838]}
            placeholder={"Search for city, zip..."}
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
            zoom={5.52}
            proximity={{ longitude: 50.92, latitude: 11.946 }}
            filter={item => {
              return item.place_type
                .map(i => {
                  console.log(i);
                  return [
                    "postcode",
                    "locality",
                    "region",
                    "district"
                  ].includes(i);
                })
                .reduce((acc, cur) => {
                  return acc || cur;
                });
            }}
          />
          <DeckGL {...viewport} layers={[searchResultLayer]} />
        </MapGL>
      </div>
    );
  }
}

export default App
