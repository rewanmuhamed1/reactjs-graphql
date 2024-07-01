import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query GetData {
    categories {
      name
      __typename
    }
    products {
      id
      name
      inStock
      gallery
      description
      category {
        name
       
      }
      attributes {
        id
        name
        type
        __typename
        items {
          id
          displayValue
          value
          __typename
        }
      }
      prices {
        amount
        __typename
        currency {
          label
          symbol
          __typename
        }
      }
      brand
      __typename
     
    }
  }
`;
