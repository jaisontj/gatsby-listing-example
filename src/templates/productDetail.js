import React from 'react'

export default class ProductDetail extends React.Component {

  render() {
    const product = this.props.data.product;
    return (
      <div>
        <h1>{product.name}</h1>
        <div>Price: {product.price}</div>
        <div>Stock: {product.stock}</div>
      </div>
    );
  }

}

export const query = graphql`
  query ProductDetails($productId: String!) {
    product(id: { eq: $productId }) {
      id
      name
      stock
      price
    }
  }
`
