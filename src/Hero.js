import { gsap, Power3, TimelineLite } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import React from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'
import { device } from './assets/Styles'
// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const Styling = styled.div`
  width: 35rem;
  @media ${device.tablet} {
    width: 100%;
  }
  .container {
    span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 18px;
      letter-spacing: normal;
    }
    h1 {
      @media ${device.tablet} {
        font-size: 48px;
      }
    }
    p {
      @media ${device.tablet} {
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
`

const Hero = ({ searched, title, subtitle, description }) => {
  return (
    <Transition
      appear
      in={!searched}
      onExit={node => {
        const timeline = new TimelineLite()
        timeline.to(node, 1.5, {
          ease: Power3.easeInOut,
          autoAlpha: 0,
        })
      }}
      timeout={{
        enter: 1000,
        exit: 1500,
      }}
      mountOnEnter
      unmountOnExit
    >
      <Styling>
        <div className="container">
          <span>{subtitle}</span>
          <h1>{title}</h1>
          <p className="lead">
        {description}
          </p>
        </div>
      </Styling>
    </Transition>
  )
}

export default Hero
