import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

const Item = () => {
  return (
    <Card>
      <Image src="https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png" />
      <Card.Content>
        <Card.Header>Daniel</Card.Header>
        <Card.Meta>Joined in 2016</Card.Meta>
        <Card.Description>
          Daniel is a comedian living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Deal
          </Button>
          <Button basic color="red">
            No deal
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default Item;
