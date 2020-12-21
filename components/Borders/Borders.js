import React from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";

import { API_URL } from "../../utils";
import { Info } from "../../components/CountryCard/CountryCard";

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

const Borders = ({ borders }) => {
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    const fetchCountries = async () => {
      //   setLoading(true);
      const res = await axios.get(`${API_URL}/all`);
      setCountries(res.data);
      //   setLoading(false);
    };
    fetchCountries();
  }, []);

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

export default Borders;
