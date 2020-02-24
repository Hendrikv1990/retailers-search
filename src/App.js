import { Power3 } from 'gsap'
import throttle from 'lodash.throttle'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'normalize.css'
import React, { Component } from 'react'
import MapGL, { FlyToInterpolator, Marker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import styled from 'styled-components'
import Api from './Api'
import { GlobalStyle } from './assets/Styles'
import Hero from './Hero'
import Pin from './Pin'
import Sidebar from './Sidebar'

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqcGM0d3U4bTB6dWwzcW04ZHRsbHl0ZWoifQ.X9cvdajtPbs9JDMG-CMDsA'

const Styling = styled.div`
  height: 100vh;
  .counter-wrapper {
    position: absolute;
    bottom: 35%;
    right: 10%;
    z-index: 2;
    text-transform: uppercase;

    font-family: BebasNeuePro;
    font-size: 34px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
  }
  .search-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    bottom: 35%;
    left: 10%;
    .hero-wrapper {
      flex: 1;
    }
    .geocoder-container {
      flex: 1;
      .mapboxgl-ctrl-geocoder {
        background: transparent;
        border-radius: 0;
        box-shadow: none;
        border-bottom: 2px solid;
        max-width: 360px;
        width: auto;
        svg {
          display: none;
        }
        input {
          width: auto;
          text-transform: uppercase;
          font-family: BebasNeuePro;
          font-size: 34px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          padding: 0;
        }
      }
      .suggestions-wrapper {
        ul {
          background-color: transparent;
          border-radius: 0;
          box-shadow: none;
          li {
            &:active {
            }
            a {
              background: transparent;
              .mapboxgl-ctrl-geocoder--suggestion {
              }
            }
          }
        }
      }
    }
  }
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searched: false,
      bounds: [],
      retailers: [],
      viewport: {
        latitude: 52.521576,
        longitude: 13.389523,
        zoom: 16,
      },
      selectedRetailerId: null,
      hoveredRetailerId: null,

      filteredRetailerIds: [],
    }
  }

  mapRef = React.createRef()
  geocoderRef = React.createRef()

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()

    const retailers = Api.getRetailers()
    this.setState({ retailers: retailers })
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
        transitionDuration: 2000,
        transitionEasing: Power3.easeInOut,
      },
    })
  }

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = {
      transitionDuration: 1000,
      onTransitionEnd: () =>
        this.handleBoundsChange(this.mapRef.current.getMap()),
      zoom: 15,
    }

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

      const filteredRetailers = retailers.filter(rtl => {
        const lat = rtl.fields.long_lat.lat
        const lng = rtl.fields.long_lat.lng

        return (
          lat > bounds[0] &&
          lng > bounds[1] &&
          lat < bounds[2] &&
          lng < bounds[3]
        )
      })

      this.setState({
        filteredRetailerIds: filteredRetailers.map(rtl => rtl.id),
        bounds,
      })
    },
    100,
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
    this.setState({ searched: true })
  }

  renderMarker = (retailer, index) => {
    const { lng, lat } = retailer.fields.long_lat
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

    return (
      <React.Fragment>
        <GlobalStyle />
        <Styling>
          <div className="search-container">
            <div className="hero-wrapper">
              <Hero searched={this.state.searched}></Hero>
            </div>

            <div ref={this.geocoderRef} className="geocoder-container"></div>
          </div>
          {this.state.searched && (
            <div className="counter-wrapper">
              {`${this.state.filteredRetailerIds.length} Ergebnisse`}
            </div>
          )}

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
              zoom={2}
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
                selectedRetailerId={this.state.selectedRetailerId}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                setRetailer={this.setRetailer}
              />
            )}
        </Styling>
      </React.Fragment>
    )
  }
}

export default App
