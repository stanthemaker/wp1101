import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
	subscription message($name1: String!, $name2: String!) {
		message(name1: $name1, name2: $name2) {
			mutation
			data {
				sender {
					name
				}
				body
			}
		}
	}
`;
// "data": {
//     "messages": [
//       {
//         "id": "61c35a35fcce74957d81634f",
//         "sender": {
//           "name": "Morgan"
//         },
//         "body": "hellow world"
//       },
