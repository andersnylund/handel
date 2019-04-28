import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Segment,
  Grid,
  Divider,
  Header,
  Image,
  Card,
  Loader,
  Message,
} from 'semantic-ui-react';

const GET_DEALS = gql`
  {
    myDeals {
      myItem {
        title
        description
        image
      }
      otherItem {
        title
        description
        image
      }
      contactEmail
    }
  }
`;

const DealsList = () => (
  <Query query={GET_DEALS}>
    {({ data, loading, error }) => {
      if (loading) {
        return <Loader active>Loading</Loader>;
      }
      if (error) {
        return <Message color="red">Something went wrong!</Message>;
      }
      return (
        <>
          {data.myDeals.map((deal, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Segment key={i}>
              <Grid columns={1} textAlign="center">
                <Grid.Column>
                  <Grid.Row>
                    <Card centered>
                      <Image src={deal.myItem.image} />
                      <Card.Content>
                        <Card.Header>{deal.myItem.title}</Card.Header>
                        <Card.Description>
                          {deal.myItem.description}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Grid.Row>

                  <Divider horizontal>against</Divider>

                  <Grid.Row>
                    <Card centered>
                      <Image src={deal.otherItem.image} />
                      <Card.Content>
                        <Card.Header>{deal.otherItem.title}</Card.Header>
                        <Card.Description>
                          {deal.otherItem.description}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Grid.Row>

                  <Divider horizontal>with</Divider>

                  <Grid.Row>
                    <Header>{deal.contactEmail}</Header>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Segment>
          ))}
        </>
      );
    }}
  </Query>
);

export default DealsList;
