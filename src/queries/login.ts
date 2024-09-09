import { gql } from "@apollo/client";

export const LOGIN_GUEST = gql`
  query LoginGuest($networkDomain: String!) {
    tokens(networkDomain: $networkDomain) {
      accessToken
      refreshToken
      role {
        name
        scopes
      }
      member {
        id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Loginuser($email: String!, $password: String!) {
    loginNetwork(input: { usernameOrEmail: $email, password: $password }) {
      accessToken
      role {
        name
        scopes
      }
      member {
        id
        name
      }
    }
  }
`;
