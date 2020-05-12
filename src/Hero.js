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

const Hero = ({ searched }) => {
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
          <span>Händlersuche</span>
          <h1>Lorem ipsum dolor sit amet.</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </p>
        </div>
      </Styling>
    </Transition>
  )
}

export default Hero
