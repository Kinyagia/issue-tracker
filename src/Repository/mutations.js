import gql from 'graphql-tag';

const STAR_REPOSITORY = gql`
	mutation($id: ID!){
		addStar(input: {starrableId: $id}){
			starrable {
				id
				viewerHasStarred
			}
		}
	}
`;

const UNSTAR_REPOSITORY = gql`
	mutation($id: ID!){
		removeStar(input: {starrableId: $id}){
			starrable {
				id
				viewerHasStarred
			}
		}
	}
`;

const WATCH_REPOSITORY = gql`
  mutation($id: ID!, $viewerSubscription: SubscriptionState!) {
    updateSubscription(
      input: { state: $viewerSubscription, subscribableId: $id }
    ) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;
export {STAR_REPOSITORY, UNSTAR_REPOSITORY, WATCH_REPOSITORY};
