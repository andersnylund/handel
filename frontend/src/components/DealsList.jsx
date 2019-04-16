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
        price
        image
      }
      otherItem {
        title
        description
        price
        image
      }
      participant {
        email
      }
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
            <Segment padded placeholder key={i}>
              <Grid
                columns={1}
                // stackable
                textAlign="center"
              >
                <Grid.Column>
                  <Grid.Row>
                    <Card>
                      <Image src={deal.myItem.image} />
                      <Card.Content>
                        <Card.Header>{deal.myItem.title}</Card.Header>
                      </Card.Content>
                    </Card>
                  </Grid.Row>

                  <Divider horizontal>against</Divider>

                  <Grid.Row>
                    <Card>
                      <Image src={deal.otherItem.image} />
                      <Card.Content>
                        <Card.Header>{deal.otherItem.title}</Card.Header>
                      </Card.Content>
                    </Card>
                  </Grid.Row>

                  <Divider horizontal>with</Divider>

                  <Grid.Row>
                    <Header>{deal.participant.email}</Header>
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
