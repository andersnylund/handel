import React from 'react';
import { Message, Button, Container } from 'semantic-ui-react';
import styled from 'styled-components';

import DealsList from '../components/DealsList';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 2rem;
`;

const MyItems = () => (
  <StyledContainer>
    <Message>
      <Message.Header>Deals</Message.Header>
      <p>
        Here you can see your deals when both you and the other person have
        pressed{' '}
        <Button color="green" size="tiny" inverted disabled>
          Deal
        </Button>{' '}
        You can contact the person with the given email address.
      </p>
    </Message>
    <DealsList />
  </StyledContainer>
);

export default MyItems;
