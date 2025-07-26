import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      productID
      productName
      price
      category {
        categoryID
        categoryName
      }
      manufacturer {
        manuID
        manuName
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query Product($productID: Int!) {
    product(productID: $productID) {
      productID
      productName
      price
      category {
        categoryID
        categoryName
      }
      manufacturer {
        manuID
        manuName
      }
    }
  }
`;
