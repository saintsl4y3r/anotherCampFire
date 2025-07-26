import { gql } from "@apollo/client";

export const ORDERS_QUERY = gql`
  query Orders {
    orders {
      orderID
      orderDate
      totalAmount
      customer {
        userID
        userName
      }
      details {
        detailID
        quantity
        price
        product {
          productID
          productName
        }
      }
    }
  }
`;

export const ORDER_QUERY = gql`
  query Order($orderID: Int!) {
    order(orderID: $orderID) {
      orderID
      orderDate
      totalAmount
      customer {
        userID
        userName
      }
      details {
        detailID
        quantity
        price
        product {
          productID
          productName
        }
      }
    }
  }
`;
