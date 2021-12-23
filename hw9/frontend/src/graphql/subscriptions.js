import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
    subscription message(&from: String!, to: String!){
        message(from: &from, to: &to){
            message{
                sender{
                    name
                }
                body
            }
        }
    }
`;
