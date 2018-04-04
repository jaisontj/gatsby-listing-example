import React from 'react'
import Link from 'gatsby-link'

const NavLink = props => {
  if (!props.test) {
    return (
      <Link to={props.url}>
        {props.text} > {props.url}
      </Link>
    )
  } else {
    return (
      <span>
        {props.text} > {props.url}
      </span>
    )
  }
}

export default class ProductList extends React.Component {

  render() {
    const { group, index, first, last, pageCount } = this.props.pathContext
    const previousUrl =
      index - 1 <= 1 ? '/productList/' : `${(index - 1).toString()}`
    const nextUrl = `${(index + 1).toString()}`

    return (
      <div>
        {
          group.map(edge => {
            const product = edge.node;
            return (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div>{product.name}</div>
              </Link>
            )
          })
        }
        <div className="previousLink">
          <NavLink test={first} url={previousUrl} text="Go to Previous Page" />
        </div>
        <div className="nextLink">
          <NavLink test={last} url={nextUrl} text="Go to Next Page" />
        </div>
      </div>
    )
  }
}
