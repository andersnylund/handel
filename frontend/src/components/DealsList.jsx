import React, { Fragment } from 'react';
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
        userId
      }
    }
  }
`;

const DealsList = () => (
  <Query query={GET_DEALS}>
    {({ data, loading }) => {
      if (loading) {
        return <Loader active>Loading</Loader>;
      }
      return (
        <Fragment>
          {data.myDeals.map((deal, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Segment placeholder key={i}>
              <Grid
                columns={1}
                stackable
                verticalAlign="middle"
                textAlign="center"
              >
                <Grid.Row verticalAlign="middle">
                  <Grid.Column>
                    <Card>
                      <Image src={deal.myItem.image} />
                      <Card.Content>
                        <Card.Header>{deal.myItem.title}</Card.Header>
                      </Card.Content>
                    </Card>
                  </Grid.Column>

                  <Divider horizontal>against</Divider>

                  <Grid.Column>
                    <Card>
                      <Image src={deal.otherItem.image} />
                      <Card.Content>
                        <Card.Header>{deal.otherItem.title}</Card.Header>
                      </Card.Content>
                    </Card>
                  </Grid.Column>

                  <Divider horizontal>with</Divider>

                  <Grid.Column>
                    <Header>{deal.participant.userId}</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          ))}
        </Fragment>
      );
    }}
  </Query>
);

export default DealsList;
