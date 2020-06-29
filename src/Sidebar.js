import { Power3, TimelineLite } from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import List from './List'
import { device } from './assets/Styles'

// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const Styling = styled.aside`
  background-color: #fcfbf7;
  opacity: 0;
  visibility: hidden;
  position: relative;
  width: 100%;
  z-index: 2;
  left: 0;
  bottom: 0;
  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${device.tablet} {
    height: auto;
    position: relative;
    justify-content: flex-start;
  }
`

const Sidebar = (props) => {
  const wrapperRef = React.useRef()

  useEffect(() => {
    const timeline = new TimelineLite()
    timeline.to(wrapperRef.current, {
      duration: 0.3,
      ease: Power3.easeInOut,
      autoAlpha: 1,
    })
  })
  return (
    <Styling ref={wrapperRef}>
      <List {...props} />
    </Styling>
  )
}

export default Sidebar
