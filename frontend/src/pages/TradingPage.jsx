import React, { Fragment, Component } from 'react';
import { Header } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import withAuthorization from '../session/withAuthorization';
import Item from '../components/Item';
import SelectMyItem from '../components/SelectMyItem';

export const NEXT_ITEM = gql`
  query($myItemId: ID!) {
    nextItem(myItemId: $myItemId) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

class TradingPage extends Component {
  state = {
    myItemId: null,
  };

  handleChangeItem = (e, { value }) => {
    this.setState({
      myItemId: value,
    });
  };

  render() {
    const { myItemId } = this.state;

    return (
      <Fragment>
        <Header as="h2">Items</Header>
        <SelectMyItem onChangeItem={this.handleChangeItem} />
        {myItemId && (
          <Query query={NEXT_ITEM} variables={{ myItemId }}>
            {({ data, loading }) => {
              if (loading) {
                return <div>Loading...</div>;
              }
              if (!data.nextItem) {
                return <div>No more items to trade against :( </div>;
              }
              return <Item item={data.nextItem} myItemId={myItemId} />;
            }}
          </Query>
        )}
      </Fragment>
    );
  }
}

export default withAuthorization(session => session && session.me)(TradingPage);
