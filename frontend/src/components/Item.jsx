import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

const Item = ({ onNext, item }) => (
  <Card>
    <Image src={item.image} />
    <Card.Content>
      <Card.Header>{item.title}</Card.Header>
      <Card.Meta>{`${item.price} €`}</Card.Meta>
      <Card.Description>{item.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="green" onClick={onNext}>
          Deal
        </Button>
        <Button basic color="red" onClick={onNext}>
          No deal
        </Button>
      </div>
    </Card.Content>
  </Card>
);

export default Item;
