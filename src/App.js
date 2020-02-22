import { Power3 } from 'gsap'
import throttle from 'lodash.throttle'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'normalize.css'
import React, { Component } from 'react'
import MapGL, { FlyToInterpolator, Marker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import styled from 'styled-components'
import Hero from './Hero'
import Pin from './Pin'
import Sidebar from './Sidebar'

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqcGM0d3U4bTB6dWwzcW04ZHRsbHl0ZWoifQ.X9cvdajtPbs9JDMG-CMDsA'

const Styling = styled.div`
  height: 100vh;
  .search-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    bottom: 30%;
    left: 10%;
    .hero-wrapper {
      flex: 1;
    }
    .geocoder-container {
      flex: 1;
    }
  }
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 50.92,
        longitude: 11.946,
        zoom: 5,
      },
      selectedRetailerId: null,
      hoveredRetailerId: null,

      retailers: [
        {
          id: '1',
          title: 'Test Berlin',
          location: 'test',
          description: 'test',
          lng: 13.38885,
          lat: 52.516949,
        },
        {
          id: '2',
          title: 'Test Berlin 2',
          location: 'test',
          description: 'test',
          lng: 13.385832,
          lat: 52.518114,
        },
        {
          id: '3',
          title: 'Test Berlin 3',
          location: 'test',
          description: 'test',
          lng: 13.385635,
          lat: 52.516776,
        },
      ],
      filteredRetailerIds: [],
    }
  }

  mapRef = React.createRef()
  geocoderRef = React.createRef()

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  handleViewportChange = viewport => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        ...viewport,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 3000,
        transitionEasing: Power3.easeInOut,
      },
    })
  }

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000, zoom: 14.5 }

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    })
  }

  handleBoundsChange = throttle(
    map => {
      let bounds = map.getBounds()
      const limitedBounds = map.unproject([60, 60])

      const hDiff = Math.abs(bounds.getNorth() - limitedBounds.lat)
      const vDiff = Math.abs(bounds.getWest() - limitedBounds.lng)

      bounds = [
        bounds.getSouth() + hDiff,
        limitedBounds.lng,
        limitedBounds.lat,
        bounds.getEast() - vDiff,
      ]

      const { retailers } = this.state

      console.log(bounds)

      this.setState({
        filteredRetailerIds: Object.keys(retailers).filter(k => {
          const lat = retailers[k].lat
          const lng = retailers[k].lng

          return (
            lat > bounds[0] &&
            lng > bounds[1] &&
            lat < bounds[2] &&
            lng < bounds[3]
          )
        }),
        bounds,
      })
    },
    500,
    { leading: true },
  )

  setRetailer = id => {
    this.setState({ selectedRetailerId: id })
  }
  onMouseEnter = id => {
    this.setState({ hoveredRetailerId: id })
  }

  onMouseLeave = () => {
    this.setState({ hoveredRetailerId: null })
  }

  handleOnResult = event => {
    this.handleBoundsChange(this.mapRef.current.getMap())
  }

  renderMarker = (retailer, index) => {
    const { lng, lat } = retailer
    return (
      <Marker
        key={`retailer-${index.toString()}`}
        longitude={lng}
        latitude={lat}
      >
        <Pin
          active={
            retailer.id === this.state.selectedRetailerId ||
            retailer.id === this.state.hoveredRetailerId
          }
          size={20}
          onMouseEnter={() => this.onMouseEnter(retailer.id)}
          onMouseLeave={() => this.onMouseLeave(null)}
          onMarkerClick={() => this.setRetailer(retailer.id)}
        />
      </Marker>
    )
  }

  render() {
    const { viewport } = this.state
    /*     if (this.mapRef.current) {
      console.log(
        this.mapRef.current
          .getMap()
          .getBounds()
          .getSouthWest(),
      )
      console.log(
        this.mapRef.current
          .getMap()
          .getBounds()
          .getNorthEast(),
      )

      console.log('============================getBounds')
      console.log(this.mapRef.current.getMap().getBounds())

      console.log(this.mapRef.current.getMap().unproject([60, 60]))
    } */
    console.log(this.state.filteredRetailerIds)
    console.log(this.state)
    return (
      <Styling>
        <div className="search-container">
          <div className="hero-wrapper">
            <Hero></Hero>
          </div>
          <div ref={this.geocoderRef} className="geocoder-container"></div>
        </div>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {this.state.retailers.map((retailer, index) =>
            this.renderMarker(retailer, index),
          )}
          <Geocoder
            containerRef={this.geocoderRef}
            countries={'de'}
            placeholder={'Search for city, zip...'}
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            zoom={5.52}
            proximity={{ longitude: 50.92, latitude: 11.946 }}
            filter={item => {
              return item.place_type
                .map(i => {
                  return [
                    'postcode',
                    'locality',
                    'region',
                    'district',
                  ].includes(i)
                })
                .reduce((acc, cur) => {
                  return acc || cur
                })
            }}
          />
        </MapGL>
        {this.state.filteredRetailerIds &&
          this.state.filteredRetailerIds.length > 0 && (
            <Sidebar
              retailers={this.state.retailers.filter(rtl => {
                return this.state.filteredRetailerIds.indexOf(rtl.id) > -1
              })}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              setRetailer={this.setRetailer}
            />
          )}
      </Styling>
    )
  }
}

export default App
