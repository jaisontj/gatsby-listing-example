import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Hello!</h1>
    <p>This is a simple gatsby app which shows a list of products fetched from an external source</p>
    <Link to="/productList/">Go to product listing</Link>
  </div>
)

export default IndexPage
