import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { API_URL } from "../../utils";
import { Info, InfoRow, Value } from "../../components/CountryCard/CountryCard";
import { Ring } from "react-awesome-spinners";

import Button from "../../components/Button/Button";
import AppLayout from "../../components/Layout/Layout";
import Borders from "../../components/Borders/Borders";

const Root = styled.div``;

const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 250px;

  @media screen and (min-width: 600px) {
    height: 250px;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const FlagWrapper = styled.div`
  margin-bottom: 16px;

  @media screen and (min-width: 600px) {
    width: 600px;
  }
`;

const ImgElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoColumn = styled.div``;

const NameValue = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const SpinnerWrapper = styled.div`
  text-align: center;
  margin-top: 20%;
`;

const CountryDetails = () => {
  const router = useRouter();
  const { code } = router.query;

  const [country, setCountry] = React.useState({});
  const [loading, setLoading] = React.useState();
  const [, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/alpha/${code}`);
        setCountry(res.data);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };

    fetchCountry();
  }, [code]);

  const getArrayValues = (value, index) => (
    <Value key={index}>{(index ? ", " : "") + value}</Value>
  );

  const NO_CAPITAL = "N/A";

  return (
    <Root>
      {loading ? (
        <SpinnerWrapper>
          <Ring />
        </SpinnerWrapper>
      ) : (
        <>
          <AppLayout>
            <AppLayout.Container>
              <Button onClick={() => router.back()}>Back</Button>
              <DetailsRow>
                <DetailsContainer>
                  <FlagWrapper>
                    <ImgElement src={country.flag}></ImgElement>
                  </FlagWrapper>
                  <InfoColumn>
                    <NameValue>{country.name}</NameValue>
                    <InfoRow>
                      <Info>Capital:</Info>
                      <Value>{country.capital || NO_CAPITAL}</Value>
                    </InfoRow>
                    <InfoRow>
                      <Info>Currency:</Info>
                      {country.currencies &&
                        country.currencies.map((currency, index) =>
                          getArrayValues(currency.name, index)
                        )}
                    </InfoRow>
                    <InfoRow>
                      <Info>Population:</Info>
                      <Value>
                        {country.population &&
                          country.population.toLocaleString()}
                      </Value>
                    </InfoRow>
                    <InfoRow>
                      <Info>Languge:</Info>
                      {country.languages &&
                        country.languages.map((language, index) =>
                          getArrayValues(language.name, index)
                        )}
                    </InfoRow>
                  </InfoColumn>
                </DetailsContainer>
              </DetailsRow>
            </AppLayout.Container>
          </AppLayout>
          <Borders borders={country.borders} />
        </>
      )}
    </Root>
  );
};

export default CountryDetails;
