import { createGlobalStyle } from 'styled-components'
import './App.css'

export const sizes = {
  desktop: 1300,
  tablet: 1024,
  phone: 768,
}

export const device = Object.keys(sizes).reduce((acc, cur) => {
  acc[cur] = `(max-width: ${sizes[cur]}px)`
  return acc
}, {})
export default device

export const GlobalStyle = createGlobalStyle`

  * { box-sizing: border-box; }
  body {
    font-family: 'Bebas Neue Pro', 'Helvetica Neue', Arial, Helvetica, Verdana,
      sans-serif;
    color: #222;
    letter-spacing: 0.2px;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    -webkit-font-smoothing: antialiased;
	   -moz-osx-font-smoothing: grayscale;
     text-rendering: optimizeLegibility;
     @media ${device.tablet} {
      }
      
        h1 {
          font-family: 'Bebas Neue Pro';
          text-transform: uppercase;
            font-size: 96px;
            margin: 0;
            line-height: 0.9;
            color: #00140f;
       }
      p {
  font-family: 'Archivo Narrow';
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #55706c;

      }
      
      h2 {
       color: #00140f;
      }

      
  }
  .geocoder-container {
  .mapboxgl-ctrl-geocoder  {
  input {
  max-width:80%!important;
  }
  }
  }
  
   .no-results {
    padding:20px 20px;
   }
   a.mapboxgl-ctrl-logo {
   display:none!important;
   }
   .mapboxgl-ctrl-geocoder--suggestion-title {
      padding-right:2px;
   }
   .mapboxgl-ctrl-geocoder .suggestions>li>a {
   padding-left: 0;
   }
  @media only screen and (max-width:1023px){
    .search-container {
    
    .geocoder-container {
    position: absolute;
    bottom: 0;
    }
    }
    
    .no-results {
  margin-top: 50px;
    padding:20px 20px;
  }
  }
  
  
     
`
