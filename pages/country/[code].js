import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "../../utils";
import { Info, InfoRow, Value } from "../../components/CountryCard/CountryCard";
import { Ring } from "react-awesome-spinners";

import Button from "../../components/Button/Button";
import AppLayout from "../../components/Layout/Layout";

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

const BorderCountryContainer = styled.div`
  margin-top: 18px;
  text-align: center;
`;

const Description = styled.div`
  font-weight: bold;
  margin-bottom: 18px;
`;

const Card = styled.div`
  border: 1px solid #e9e9e9;
  padding: 8px;
  max-width: 400px;
  margin: 0 auto 16px;
`;

const CardContainer = styled.div`
  display: flex;
  color: inherit;
  text-decoration: none;
`;

const FlagColumn = styled.div`
  text-align: left;
  margin-right: 30px;
`;

const DetailsColumn = styled.div`
  margin: auto;
`;

const SpinnerWrapper = styled.div`
  text-align: center;
  margin-top: 20%;
`;

const CountryDetails = () => {
  const router = useRouter();
  const { code } = router.query;

  const [country, setCountry] = React.useState({});
  const [countries, setCountries] = React.useState([]);
  const [loading, setLoading] = React.useState();
  const [error, setError] = React.useState(false);

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

  React.useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const res = await axios.get(`${API_URL}/all`);
      setCountries(res.data);
      setLoading(false);
    };
    fetchCountries();
  }, []);

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
          <Borders borders={country.borders} countries={countries} />
        </>
      )}
    </Root>
  );
};

const Borders = ({ borders, countries }) => {
  if (!borders || borders.length === 0 || countries.length === 0) {
    return <Description>No borders</Description>;
  }

  const countriesByCode = countries.reduce((acc, curr) => {
    acc[curr.alpha3Code] = curr;
    return acc;
  }, {});

  const FLAG_WIDTH = 120;
  const FLAG_HEIGHT = 60;

  return (
    <BorderCountryContainer>
      <Description>Border Countries:</Description>
      {borders.map((border) => {
        const country = countriesByCode[border];

        return (
          !!country && (
            <Card key={border}>
              <Link
                href={{
                  pathname: "/country/[code]",
                  query: { code: country.alpha3Code },
                }}
              >
                <a>
                  <CardContainer>
                    <FlagColumn>
                      <img
                        src={country.flag}
                        width={FLAG_WIDTH}
                        height={FLAG_HEIGHT}
                        alt={country.name}
                      />
                    </FlagColumn>

                    <DetailsColumn>
                      <Info>{country.name}</Info>
                      <Info>{country.population.toLocaleString()}</Info>
                    </DetailsColumn>
                  </CardContainer>
                </a>
              </Link>
            </Card>
          )
        );
      })}
    </BorderCountryContainer>
  );
};

export default CountryDetails;
