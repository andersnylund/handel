import React, { Fragment } from 'react';
import { Dropdown, Header, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { func } from 'prop-types';

import { GET_MY_ITEMS } from './MyItemList';

const SelectMyItem = ({ onChangeItem }) => (
  <Query query={GET_MY_ITEMS}>
    {({ data, loading }) => {
      if (loading) {
        return <Loader active>Loading</Loader>;
      }
      const options = data.myItems.map(item => ({
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
);

SelectMyItem.propTypes = {
  onChangeItem: func.isRequired,
};

export default SelectMyItem;
