import React, { Fragment } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import { Query } from 'react-apollo';

import { GET_MY_ITEMS } from './MyItemList';

const SelectMyItem = ({ onChangeItem }) => (
  <Fragment>
    <Query query={GET_MY_ITEMS}>
      {({ data, loading }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        const options = data.myItems.edges.map(item => ({
          key: item.id,
          value: item.id,
          text: item.title,
          content: (
            <Header
              image={item.image}
              content={item.title}
              subheader={`${item.price} €`}
            />
          ),
        }));

        return (
          <Fragment>
            <Dropdown
              onChange={onChangeItem}
              options={options}
              selection
              scrolling
              placeholder="Select an item to trade with"
            />
          </Fragment>
        );
      }}
    </Query>
  </Fragment>
);

export default SelectMyItem;
