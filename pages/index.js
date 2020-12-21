import React from "react";

import AppLayout from "../components/Layout/Layout";
import CountryCard from "../components/CountryCard/CountryCard";
import { getCountries } from "../api";

const Home = ({ countries }) => {
  return (
    <AppLayout>
      <AppLayout.Container>
        {countries && <CountryCard countries={countries} />}
      </AppLayout.Container>
    </AppLayout>
  );
};

export const getStaticProps = async () => {
  const res = await getCountries();

  return {
    props: {
      countries: res,
    },
  };
};

export default Home;
