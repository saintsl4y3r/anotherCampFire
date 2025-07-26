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
      }
    }
  }
`;
