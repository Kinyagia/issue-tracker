import React, {Component} from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import IssueItem from '../IssueItem';
import Loading from '../../Loading';
import ErrorMessage from '../../Error';

import './style.css';

const ISSUE_STATES ={
	NONE: 'NONE',
	OPEN: 'OPEN',
	CLOSED: 'CLOSED',
};

const isShow = issueState => issueState !== ISSUE_STATES.NONE;

const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryOwner: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
      }
    }
  }
`;

class Issues extends Component {
	state= {
		issueState: ISSUE_STATES.NONE,
	};
	
	onChangeIssueState = nextIssueState => {
		this.setState({issueState: nextIssueState});
	};

	render () {
		const { issueState } = this.state;
		const {repositoryOwner, repositoryName } =this.props
	
	return (
	  <div className="Issues">
		{isShow(issueState) && (
		  <Query
		    query={GET_ISSUES_OF_REPOSITORY}
		    variables={{
		      repositoryOwner,
		      repositoryName,
		    }}
		  >
		    {({ data, loading, error }) => {
		      if (error) {
			return <ErrorMessage error={error} />;
		      }

		      const { repository } = data;

		      if (loading && !repository) {
			return <Loading />;
		      }

		      if (!repository.issues.edges.length) {
			return <div className="IssueList">No issues ...</div>;
		      }

		      return <IssueList issues={repository.issues} />;
		    }}
		  </Query>
	)}
	</div>
);
	}
}
const IssueList = ({ issues }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
);

export default Issues;
