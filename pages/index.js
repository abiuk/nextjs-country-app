import React from "react";
import styled from "styled-components";
import { Ring } from "react-awesome-spinners";
import axios from "axios";
import ReactPaginate from "react-paginate";
import AppLayout from "../components/Layout/Layout";
import { API_URL } from "../utils";
import CountryCard from "../components/CountryCard/CountryCard";

const SpinnerWrapper = styled.div`
  text-align: center;
  margin-top: 20%;
`;

const ReactPaginateStyled = styled.div`
  display: flex;
  .pagination {
    margin-top: 15px;
    display: flex;
    list-style: none;
    padding: 0;
    margin-left: auto;
  }
  .pagination > .active > a {
    background-color: #000;
    border-color: #000;
    color: #fff;
  }
  .pagination > li > a {
    border: 1px solid #e9e9e9;
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
    color: #000;
  }
`;

const Home = () => {
  const [countries, setCountries] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countriesPerPage] = React.useState(10);

  React.useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const res = await axios.get(`${API_URL}/all`);
      setCountries(res.data);
      setLoading(false);
    };
    fetchCountries();
  }, []);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const handlePageChange = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage + 1);
  };

  return (
    <AppLayout>
      <AppLayout.Container>
        {loading ? (
          <SpinnerWrapper>
            <Ring />
          </SpinnerWrapper>
        ) : (
          <>
            <CountryCard
              countriesPage={currentCountries}
              countries={countries}
            />
            <ReactPaginateStyled>
              <ReactPaginate
                pageCount={Math.ceil(countries.length / countriesPerPage)}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
                previousLabel={"<"}
                nextLabel={">"}
              />
            </ReactPaginateStyled>
          </>
        )}
      </AppLayout.Container>
    </AppLayout>
  );
};

export default Home;
