import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      categoryID
      categoryName
    }
  }
`;

// this one is consumed by your detail-page component as CATEGORY_BY_ID
export const CATEGORY_BY_ID = gql`
  query Category($categoryID: Int!) {
    category(categoryID: $categoryID) {
      categoryID
      categoryName
      products {
        productID
        productName
        price
      }
    }
  }
`;

// **alias** so that `import { CATEGORY_QUERY }` also works
export const CATEGORY_QUERY = CATEGORY_BY_ID;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      categoryID
      categoryName
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($categoryID: Int!, $input: CategoryInput!) {
    updateCategory(categoryID: $categoryID, input: $input) {
      categoryID
      categoryName
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($categoryID: Int!) {
    deleteCategory(categoryID: $categoryID)
  }
`;
