import { gql } from "@apollo/client";

export const REVIEWS_QUERY = gql`
  query Reviews {
    reviews {
      reviewID
      rating
      comment
      createdAt
      customer {
        userID
        userName
      }
      product {
        productID
        productName
      }
    }
  }
`;

export const REVIEW_QUERY = gql`
  query Review($reviewID: Int!) {
    review(reviewID: $reviewID) {
      reviewID
      rating
      comment
      createdAt
      customer {
        userID
        userName
      }
      product {
        productID
        productName
      }
    }
  }
`;
