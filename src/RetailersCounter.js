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
  bottom: 40%;
  right: 5%;
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
