// src/graphql/categories.js
import { gql } from "@apollo/client";

// 1) Lấy all categories
export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      _id
      categoryName
    }
  }
`;

// 2) Lấy 1 category theo ID
export const CATEGORY_BY_ID = gql`
  query Category($id: ID!) {
    category(id: $id) {
      _id
      categoryName
    }
  }
`;

// 3) Tạo mới
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      _id
      categoryName
    }
  }
`;

// 4) Cập nhật
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input) {
      _id
      categoryName
    }
  }
`;

// 5) Xóa
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
