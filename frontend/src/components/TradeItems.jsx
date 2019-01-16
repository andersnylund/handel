import React, { Fragment } from 'react';
import Item from './Item';

class TradeItems extends React.Component {
  state = {
    index: 0,
  };

  nextItem = () => {
    this.setState(prev => ({
      index: prev.index + 1,
    }));
  };

  render() {
    const { index } = this.state;
    const { items } = this.props;

    if (!items[index]) {
      return <div>No more items...</div>;
    }

    return (
      <Fragment>
        <Item onNext={this.nextItem} item={items[index]} />
      </Fragment>
    );
  }
}

export default TradeItems;
