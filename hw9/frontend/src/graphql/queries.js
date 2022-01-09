import { gql } from "@apollo/client";

export const CHATBOX_QUERY = gql`
	query chatBox($name1: String!, $name2: String!) {
		chatBox(name1: $name1, name2: $name2) {
			messages {
				sender {
					name
				}
				body
			}
		}
	}
`;
