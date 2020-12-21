import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Root = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const Container = styled.div`
  max-width: 1010px;
  padding: 25px 20px;
  margin: 0 auto;
  position: relative;
`;

const ImageWrapper = styled.div`
  img {
    width: 25px;
    position: absolute;
    top: 15px;
    left: 5px;
  }
`;

const Title = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 28px;
  cursor: pointer;
`;

const Header = () => (
  <Root>
    <Container>
      <ImageWrapper>
        <img src="/001-santa-hat.png" alt="santa hat" />
      </ImageWrapper>
      <Link href={{ pathname: "/" }}>
        <Title>Countries App</Title>
      </Link>
    </Container>
  </Root>
);

export default Header;
