import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

import React from "react";
import renderer from "react-test-renderer";

import CountryCard from "./CountryCard";

jest.mock("next/router", () => ({ push: jest.fn() }));

const countries = [
  {
    name: "Fiji",
    topLevelDomain: [".fj"],
    alpha2Code: "FJ",
    alpha3Code: "FJI",
    callingCodes: ["679"],
    capital: "Suva",
    altSpellings: [
      "FJ",
      "Viti",
      "Republic of Fiji",
      "Matanitu ko Viti",
      "Fijī Gaṇarājya",
    ],
    region: "Oceania",
    subregion: "Melanesia",
    population: 867000,
    latlng: [-18, 175],
    demonym: "Fijian",
    area: 18272,
    gini: 42.8,
    timezones: ["UTC+12:00"],
    borders: [],
    nativeName: "Fiji",
    numericCode: "242",
    currencies: [[Object]],
    languages: [[Object], [Object], [Object], [Object]],
    translations: {
      de: "Fidschi",
      es: "Fiyi",
      fr: "Fidji",
      ja: "フィジー",
      it: "Figi",
      br: "Fiji",
      pt: "Fiji",
      nl: "Fiji",
      hr: "Fiđi",
      fa: "فیجی",
    },
    flag: "https://restcountries.eu/data/fji.svg",
    regionalBlocs: [],
    cioc: "FIJ",
  },
  {
    name: "Finland",
    topLevelDomain: [".fi"],
    alpha2Code: "FI",
    alpha3Code: "FIN",
    callingCodes: ["358"],
    capital: "Helsinki",
    altSpellings: [
      "FI",
      "Suomi",
      "Republic of Finland",
      "Suomen tasavalta",
      "Republiken Finland",
    ],
    region: "Europe",
    subregion: "Northern Europe",
    population: 5491817,
    latlng: [64, 26],
    demonym: "Finnish",
    area: 338424,
    gini: 26.9,
    timezones: ["UTC+02:00"],
    borders: ["NOR", "SWE", "RUS"],
    nativeName: "Suomi",
    numericCode: "246",
    currencies: [[Object]],
    languages: [[Object], [Object]],
    translations: {
      de: "Finnland",
      es: "Finlandia",
      fr: "Finlande",
      ja: "フィンランド",
      it: "Finlandia",
      br: "Finlândia",
      pt: "Finlândia",
      nl: "Finland",
      hr: "Finska",
      fa: "فنلاند",
    },
    flag: "https://restcountries.eu/data/fin.svg",
    regionalBlocs: [[Object]],
    cioc: "FIN",
  },
  {
    name: "France",
    topLevelDomain: [".fr"],
    alpha2Code: "FR",
    alpha3Code: "FRA",
    callingCodes: ["33"],
    capital: "Paris",
    altSpellings: ["FR", "French Republic", "République française"],
    region: "Europe",
    subregion: "Western Europe",
    population: 66710000,
    latlng: [46, 2],
    demonym: "French",
    area: 640679,
    gini: 32.7,
    timezones: [
      "UTC-10:00",
      "UTC-09:30",
      "UTC-09:00",
      "UTC-08:00",
      "UTC-04:00",
      "UTC-03:00",
      "UTC+01:00",
      "UTC+03:00",
      "UTC+04:00",
      "UTC+05:00",
      "UTC+11:00",
      "UTC+12:00",
    ],
    borders: ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"],
    nativeName: "France",
    numericCode: "250",
    currencies: [[Object]],
    languages: [[Object]],
    translations: {
      de: "Frankreich",
      es: "Francia",
      fr: "France",
      ja: "フランス",
      it: "Francia",
      br: "França",
      pt: "França",
      nl: "Frankrijk",
      hr: "Francuska",
      fa: "فرانسه",
    },
    flag: "https://restcountries.eu/data/fra.svg",
    regionalBlocs: [[Object]],
    cioc: "FRA",
  },
];

describe("CountryCard", () => {
  it("should render successfully", () => {
    const tree = renderer
      .create(<CountryCard countries={countries} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
