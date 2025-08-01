import { gql } from "@apollo/client";

export const MANUFACTURERS_QUERY = gql`
  query Manufacturers {
    manufacturers {
      manuID
      manuName
    }
  }
`;

export const MANUFACTURER_QUERY = gql`
  query Manufacturer($manuID: Int!) {
    manufacturer(manuID: $manuID) {
      manuID
      manuName
      products {
        productID
        productName
        price
      }
    }
  }
`;

// alias so your component import matches
export const MANUFACTURER_BY_ID = MANUFACTURER_QUERY;

export const CREATE_MANUFACTURER = gql`
  mutation CreateManufacturer($input: ManufacturerInput!) {
    createManufacturer(input: $input) {
      manuID
      manuName
    }
  }
`;

export const UPDATE_MANUFACTURER = gql`
  mutation UpdateManufacturer($manuID: Int!, $input: ManufacturerInput!) {
    updateManufacturer(manuID: $manuID, input: $input) {
      manuID
      manuName
    }
  }
`;

export const DELETE_MANUFACTURER = gql`
  mutation DeleteManufacturer($manuID: Int!) {
    deleteManufacturer(manuID: $manuID)
  }
`;
