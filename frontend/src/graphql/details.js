import { gql } from "@apollo/client";

export const DETAILS_QUERY = gql`
  query Details {
    details {
      detailID
      quantity
      price
      product {
        productID
        productName
      }
      order {
        orderID
        totalAmount
      }
    }
  }
`;

export const DETAIL_QUERY = gql`
  query Detail($detailID: Int!) {
    detail(detailID: $detailID) {
      detailID
      quantity
      price
      product {
        productID
        productName
      }
      order {
        orderID
        totalAmount
      }
    }
  }
`;
