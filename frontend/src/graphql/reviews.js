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
        price
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
        price
      }
    }
  }
`;

// alias so your component import matches
export const REVIEW_BY_ID = REVIEW_QUERY;

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
      reviewID
      rating
      comment
      createdAt
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($reviewID: Int!, $input: ReviewInput!) {
    updateReview(reviewID: $reviewID, input: $input) {
      reviewID
      rating
      comment
      createdAt
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewID: Int!) {
    deleteReview(reviewID: $reviewID)
  }
`;
