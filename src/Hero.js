import { Power3, TimelineLite } from 'gsap'
import React, { useEffect } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

const Styling = styled.div`
  width: 35rem;
  .container {
    span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 0.9;
      letter-spacing: normal;
    }
    h1 {
    }
    p {
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
