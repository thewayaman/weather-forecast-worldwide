import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      edges {
        node {
          name
          capital
          region
          subregion
          flag
          area
          population
          languages {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COUNTRIES_BY_FILTER = (filter: string) => gql`
  query GetCountriesByFilter {
    countries(${filter}) {
      edges {
        node {
          name
          capital
          region
          subregion
          flag
          area
          population
          languages{
          edges{
            node{
              name
            }
          }
        }
        }
      }
    }
  }
`;

export const GET_COUNTRIES_BY_NAME = (filter: string) => gql`
  query GetCountriesByFilter {
    countries(${filter}) {
      edges {
        node {
          name
          capital
          region
          subregion
          flag
          area
          population
          borders
          timezones
          latLng
          languages{
          edges{
            node{
              name
            }
          }
        }
        currencies{
        edges{
          node{
            name
            code
            symbol
          }
          }
        }
        }
      }
    }
  }
`;

export const GET_COUNTRY_LANGUAGES = gql`
  query GetCountryLanguages {
    languages {
      edges {
        node {
          name
          nativeName
          iso6391
          iso6392
        }
      }
    }
  }
`;
