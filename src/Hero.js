import { Power3 } from 'gsap'
import React from 'react'
import styled from 'styled-components'

const Styling = styled.div`
  width: 30rem;
  .container {
    span {
    }
    h1 {
    }
    p {
    }
  }
`

const Hero = () => {
  return (
    <Styling>
      <div className="container">
        <span> Something before title</span>
        <h1>Hello, world!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          It uses utility classNamees for typography and spacing to space
          content out within the larger container.
        </p>
      </div>
    </Styling>
  )
}

export default Hero
