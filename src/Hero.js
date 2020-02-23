import { Power3 } from 'gsap'
import React from 'react'
import styled from 'styled-components'

const Styling = styled.div`
  width: 30rem;
  .container {
    span {
    }
    h1 {
      font-size: 4em;
      margin: 0;
    }
    p {
      font-size: 14px;
      line-height: 1.5;
      color: #55706c;
    }
  }
`

const Hero = () => {
  return (
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
  )
}

export default Hero
