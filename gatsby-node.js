const crypto = require('crypto');
const path = require(`path`);
const createPaginatedPages = require("gatsby-paginate");
const algoliasearch = require('algoliasearch');

const ALGOLIA_API_KEY = '<YOUR_ALGOLIA_API_KEY>';
const ALGOLIA_INDEX = '<YOUR_ALGOLIA_INDEX_NAME>';
const ALGOLIA_APP_ID = '<YOUR_ALGOLIA_APP_ID';
const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const algoliaIndex = algoliaClient.initIndex(ALGOLIA_INDEX);

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;
  return new Promise((resolve, reject) => {
    algoliaIndex.search({
      query: '', //fetch all
      hitsPerPage: 1000
      },
      function searchDone(err, content) {
        if (err) {
          console.log('\nError');
          console.log(err);
          reject();
        } else {
          console.log('\nSuccessfully fetched data from Algolia');
          content.hits.forEach(content => {
            const projectNode =  {
              id: content.objectID,
              parent: null,
              children: [],
              internal: {
                type: `Product`,
                contentDigest: crypto
                  .createHash(`md5`)
                  .update(JSON.stringify(content))
                  .digest(`hex`),
              },
              name: content.name,
              stock: content.stock,
              price: content.price,
            }
            createNode(projectNode);
          });
          resolve();
        }
      }
    );
  });
};

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;
  const products = []
  for (var i = 0; i < 100; i++) {
    products.push({
      id: `${i+1}`,
      name: `Product ${i+1}`,
      stock: Math.floor((Math.random() * 100) + 1),
      price: `${Math.floor((Math.random() * 1000) + 1)} INR`,
    })
  }
  products.forEach(content => {
    const productNode =  {
      id: content.id,
      parent: null,
      children: [],
      internal: {
        type: `Product`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(content))
          .digest(`hex`),
      },
      name: content.name,
      stock: content.stock,
      price: content.price,
    }
    createNode(productNode);
  });
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allProduct {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `
  ).then(result => {
    createPaginatedPages({
      edges: result.data.allProduct.edges,
      createPage: createPage,
      pageTemplate: "src/templates/productList.js",
      pageLength: 10, // This is optional and defaults to 10 if not used
      pathPrefix: "productList", // This is optional and defaults to an empty string if not used
    });
    result.data.allProduct.edges.forEach(({ node }) => {
      createPage({
        path: `product/${node.id}`,
        component: path.resolve(`./src/templates/productDetail.js`),
        context: {
          productId: node.id
        },
      })
    })
    resolve()
    })
  }).catch(error => {
    console.log(error)
    reject()
  })
};
