/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Message } from 'semantic-ui-react';
import posed from 'react-pose';
import styled from 'styled-components';

import HandShake from '../assets/hand-shake.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Img = styled.img`
  max-width: 20rem;
`;

const Posed = posed.section({
  after: { y: 0, opacity: 1 },
  before: { y: -50, opacity: 0 },
});

const StyledPosed = styled(Posed)`
  flex-grow: 1;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.section`
  padding: 2rem;
  text-align: center;
  flex: 1;
`;

const StyledMessage = styled(Message)`
  &&& {
    margin: 2rem;
  }
`;

const Footer = styled.footer`
  background: #a3a3a3;
  padding: 2rem;
  height: 5rem;
  a {
    color: #feffea;
  }
`;

const LandingPage = () => (
  <Container>
    <StyledPosed pose="after" initialPose="before">
      <Header>
        <Img src={HandShake} alt="Hand-shake" />
        <h2>Handel</h2>
      </Header>
      <Content>
        Handel is like Tinder, but with your stuff that you own. Instead of
        dealing with your love, you deal with stuff that you don&apos;t any
        longer need or want.
      </Content>
    </StyledPosed>
    <StyledMessage color="red">
      This is a testing version of the early version of the service. I take no
      responsibility or liability of anything you do with the service. I may
      delete all content on this site without warning at any point.
    </StyledMessage>
    <Footer>
      Handshake icon made by{' '}
      <a
        href="https://www.flaticon.com/authors/pixel-perfect"
        title="Pixel perfect"
      >
        Pixel perfect
      </a>{' '}
      from{' '}
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>{' '}
      is licensed by{' '}
      <a
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
        target="_blank"
        rel="noopener noreferrer"
      >
        CC 3.0 BY
      </a>
    </Footer>
  </Container>
);

export default LandingPage;
