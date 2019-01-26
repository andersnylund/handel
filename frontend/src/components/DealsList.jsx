import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Segment, Grid, Divider, Header, Image, Card } from 'semantic-ui-react';

const GET_DEALS = gql`
  {
    myDeals {
      edges {
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
  }
`;

const DealsList = () => (
  <Query query={GET_DEALS}>
    {({ data, loading }) => {
      if (loading) {
        return <div>loading...</div>;
      }
      return (
        <Fragment>
          {data.myDeals.edges.map(deal => (
            <Segment placeholder>
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
