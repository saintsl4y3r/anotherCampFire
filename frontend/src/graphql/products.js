// src/graphql/products.js
import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      productID
      productName
      price
      stock
      category {
        categoryID
        categoryName
      }
      manufacturer {
        manuID
        manuName
      }
      description
      createdAt
      rating
      reviews
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query Product($productID: Int!) {
    product(productID: $productID) {
      productID
      productName
      price
      stock
      category {
        categoryID
        categoryName
      }
      manufacturer {
        manuID
        manuName
      }
      description
      createdAt
      rating
      reviews
    }
  }
`;

// alias để match import của component
export const PRODUCT_BY_ID = PRODUCT_QUERY;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      productID
      productName
      price
      stock
      category {
        categoryID
        categoryName
      }
      manufacturer {
        manuID
        manuName
      }
      description
      createdAt
      rating
      reviews
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($productID: Int!, $input: ProductInput!) {
    updateProduct(productID: $productID, input: $input) {
      productID
      productName
      price
      stock
      category {
        categoryID
        categoryName
      }
      manufacturer {
        manuID
        manuName
      }
      description
      createdAt
      rating
      reviews
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productID: Int!) {
    deleteProduct(productID: $productID)
  }
`;
