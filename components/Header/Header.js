import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Root = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const Container = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  margin: 0 auto;
  cursor: pointer;
`;

const Title = styled(Link)`
  font-size: 28px;
  color: inherit;
  text-decoration: none;
`;

const Header = () => (
  <Root>
    <Container>
      <Title href={{ pathname: "/" }}>Countries App</Title>
    </Container>
  </Root>
);

export default Header;
