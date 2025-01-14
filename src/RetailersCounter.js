import { gsap, Power3, TimelineLite } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import React, { useEffect } from 'react'
import styled from 'styled-components'

// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const Styling = styled.aside`
  position: absolute;
  opacity: 0;
  visibility: hidden;
  bottom: 30%;
  right: 5%;
  z-index: 2;
  text-transform: uppercase;
  font-family: 'Bebas Neue Pro';
  font-size: 34px;
  text-align: right;
  @media only screen and (max-width:1023px){
    display: none;
    opacity:0;
    bottom: 18%;
    text-align: left;
    left: 20px;  
  }
`

const RetailersCounter = ({ count }) => {
  const wrapperRef = React.useRef()

  useEffect(() => {
    const timeline = new TimelineLite()
    timeline.to(
      wrapperRef.current,
      {
        duration: 0.5,
        ease: Power3.easeInOut,
        autoAlpha: 1,
      },
      '+=1',
    )
  })
  return <Styling ref={wrapperRef}>{`${count} Ergebnisse`}</Styling>
}

export default RetailersCounter
