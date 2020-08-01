import { gsap, Power3, TimelineLite } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import throttle from 'lodash.throttle'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'normalize.css'
import React, { Component } from 'react'
import MapGL, { FlyToInterpolator, NavigationControl, Marker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import styled from 'styled-components'
import Api from './Api'
import { device, GlobalStyle } from './assets/Styles'
import Hero from './Hero'
import Pin from './Pin'
import RetailersCounter from './RetailersCounter'
import Sidebar from './Sidebar'

// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqcGM0d3U4bTB6dWwzcW04ZHRsbHl0ZWoifQ.X9cvdajtPbs9JDMG-CMDsA'

const Styling = styled.div`
  height: 100vh;
  .mapboxgl-ctrl-group {
  bottom: 20%;
    right: 5%;
    position: absolute;
    @media only screen and (max-width:768px){
        bottom: 55%;
    }
  }
  .search-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    bottom: 25%;
    left: 5%;
        width: 390px;

    @media ${device.tablet} {
        width: 280px;
      bottom: 0;
      top: 15%;
      left: 0;
      margin: 1.5rem;
    }

    .hero-wrapper {
      flex: 1;
    }
    
    .mapboxgl-ctrl-geocoder--icon-search {
    display:block!important;
      background-image:url(../wp-content/themes/tomhemps/src/icons/Arrow_Dark.svg);
      background-size:auto;
      width:60px;
      height:20px;
      right:0;
      left:unset!important;
      background-repeat:no-repeat;
      path {
      display:none;
      }
    }
    .geocoder-container {
      flex: 1;
      .mapboxgl-ctrl-geocoder {
        /* &:after {
          content: '';
          position: absolute;

          left: 200px;
          margin-left: -40px;
          width: 40px;
          height: 100%;
          top: 0;
          background: linear-gradient(
            to right,
            rgba(240, 244, 245, 0),
            rgba(240, 244, 245, 1)
          );
        } */
        background: transparent;
        border-radius: 0;
        box-shadow: none;
        border-bottom: 2px solid;
        width: 360px;
        @media only screen and (max-width:1024px){
          width:280px;
        }
        width: auto;
        svg {
          display: none;
        }
        input {
          max-width: 80%;
          width: auto;
          text-transform: uppercase;
          font-family: 'Bebas Neue Pro';
          font-size: 34px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          padding: 0;
          overflow: hidden;
          max-width: 300px;
          position: relative;
          white-space: nowrap;
        }
      }
      .suggestions-wrapper {
        ul {
          background-color: transparent;
          border-radius: 0;
          box-shadow: none;
          li {
            text-transform: uppercase;
            font-family: 'Bebas Neue Pro';
            font-size: 20px;
            line-height: 18px;
            font-weight: bold;
            &:active {
              color: #058273;
            }
            a {
              animation: all 0.2 ease-in-out;
              &:hover {
                color: #058273;
              }
              background: transparent;
              .mapboxgl-ctrl-geocoder--suggestion {
                .mapboxgl-ctrl-geocoder--suggestion-title {
                  display: inline-block;
                }
                .mapboxgl-ctrl-geocoder--suggestion-address {
                  display: inline-block;
                }
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
      mapOpacity: "0.5",
      containerPosition: "relative",
      searched: false,
      zoom: 14,
      bounds: [],
      retailers: [],
      viewport: {
        latitude: 52.521576,
        longitude: 13.389523,
        zoom: 4,
      },
      selectedRetailerId: null,
      hoveredRetailerId: null,
      geoPos: "85%",
      filteredRetailerIds: null,
    }
  }
  searchRef = React.createRef()
  mapRef = React.createRef()
  geocoderRef = React.createRef()

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()

    const retailers = Api.getRetailers()

      this.resize();

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  calculateMapHeight = () => {
    return this.state.filteredRetailerIds
      ? window.innerHeight - 192
      : window.innerHeight
  }

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: this.calculateMapHeight(),
    })
  }

  handleViewportChange = viewport => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        ...viewport,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 500,
        transitionEasing: Power3.easeInOut,
      },
    })
  }

  handleGeocoderViewportChange = viewport => {
    if(this.state.viewport.width < 1024){
      this.setState({
        geoPos: "40vh"
      })
    }
    const timeline = new TimelineLite()
    timeline.to(
      this.searchRef.current,
      {
        duration: 0.7,
        ease: Power3.easeInOut,
        bottom: this.state.geoPos,
      },
      '+=1',
    )
    const geocoderDefaultOverrides = {
      transitionDuration: 1000,
      onTransitionEnd: () => {
        this.handleBoundsChange(this.mapRef.current.getMap())
      },
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

    const { lat, lng } = this.state.retailers.find(
      x => x.id === id,
    ).fields.long_lat

    this.handleViewportChange({ latitude: lat, longitude: lng, zoom: 16 })
  }
  onMouseEnter = id => {
    this.setState({ hoveredRetailerId: id })
  }

  onMouseLeave = () => {
    this.setState({ hoveredRetailerId: null })
  }

  handleOnResult = event => {
    const timeline = new TimelineLite()
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    this.setState({ searched: true, mapOpacity: "1", containerPosition:'absolute' })
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
    const { viewport, mapOpacity, containerPosition, language } = this.state

    const global = window.rs_global
    return (
      <React.Fragment>
        <GlobalStyle />
        <Styling>
          <div ref={this.searchRef} className="search-container">
            <div className="hero-wrapper">
              <Hero searched={this.state.searched} title={global.title} subtitle={global.subtitle} description={global.description}></Hero>
            </div>

            <div style={{ position: containerPosition }} ref={this.geocoderRef} className="geocoder-container container"></div>
          </div>
          <MapGL
            style={{ opacity: mapOpacity }}
            ref={this.mapRef}
            {...viewport}
            dragPan={true}
            touchZoom={true}
            doubleClickZoom={false}
            defaultZoomRate={2}
            zoomRate={2}
            width="100%"
            height={this.calculateMapHeight()}
            onViewportChange={this.handleViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >
            <NavigationControl onViewportChange={(viewport) => this.setState({viewport})}/>
            {this.state.retailers.map((retailer, index) =>
              this.renderMarker(retailer, index),
            )}
            <Geocoder
              containerRef={this.geocoderRef}
              placeholder={global.placeholder}
              mapRef={this.mapRef}
              onMouseEnter={this.increaseOpacity}
              onResult={this.handleOnResult}
              onViewportChange={this.handleGeocoderViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              filter={item => {
                return item.place_type
                  .map(i => {
                    return [
                      'country',
                      'place',
                      'city',
                      'postcode',
                      'locality',
                      'district',
                    ].includes(i)
                  })
                  .reduce((acc, cur) => {
                    return acc || cur
                  })
              }}
            />

          </MapGL>
          {this.state.searched && this.state.filteredRetailerIds && (
          <RetailersCounter count={this.state.filteredRetailerIds.length} />
          )}
          {this.state.filteredRetailerIds && (
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
