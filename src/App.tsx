import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import CityPage from './pages/CityPage/CityPage';
import CountryPage from './pages/CountryPage/CountryPage';
import HomePage from './pages/HomePage/HomePage';
import PriceComparisonPage from './pages/PriceComparisonPage/PriceComparisonPage';
import ContactPage from './pages/ContactPage/ContactPage';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCitiesList } from './store/citiesListSlice';
import { ICityData } from './utils/types';
import { IUrlOptions, options } from './utils/options';
import { urlCitiesList } from './utils/url';
import Spinner from './components/Spinner/Spinner';


interface ICitiesListFromUrl {
  cities: ICityData[];
  error: null;
}

//TODO - mock do usunięcia
const apiResponseCitiesMock: ICitiesListFromUrl = {
  cities: [
    {
      city_id: 1,
      city_name: "Herat",
      country_name: "Afghanistan",
      lat: 34.352865,
      lng: 62.20402869999999,
      state_code: null
    },
    {
      city_id: 2,
      city_name: "Kabul",
      country_name: "Afghanistan",
      lat: 34.5553494,
      lng: 69.207486,
      state_code: null
    },
    {
      city_id: 11,
      city_name: "Tirana",
      country_name: "Albania",
      lat: 41.3275459,
      lng: 19.8186982,
      state_code: null
    },
    {
      city_id: 30,
      city_name: "Buenos Aires",
      country_name: "Argentina",
      lat: -34.6036844,
      lng: -58.3815591,
      state_code: null
    },
    {
      city_id: 1588,
      city_name: "Gdynia",
      country_name: "Poland",
      lat: 54.5188898,
      lng: 18.5305409,
      state_code: null
    },
    {
      city_id: 2634,
      city_name: "Los Gatos",
      country_name: "United States",
      lat: 37.2358078,
      lng: -121.9623751,
      state_code: "CA"
    },
    {
      city_id: 2662,
      city_name: "Miami",
      country_name: "United States",
      lat: 25.7616798,
      lng: -80.1917902,
      state_code: "FL",
    },
    {
      city_id: 2682,
      city_name: "Mountain View",
      country_name: "United States",
      lat: 37.3860517,
      lng: -122.0838511,
      state_code: "CA",
    },
    {
      city_id: 2685,
      city_name: "Murrieta",
      country_name: "United States",
      lat: 33.5539143,
      lng: -117.2139232,
      state_code: "CA",
    },
    {
      city_id: 2680,
      city_name: "Mt Pleasant",
      country_name: "United States",
      lat: 43.59780749999999,
      lng: -84.7675139,
      state_code: "MI",
    },
    {
      city_id: 2686,
      city_name: "Muskegon",
      country_name: "United States",
      lat: 43.2341813,
      lng: -86.24839209999999,
      state_code: "MI",
    },
  ],
  error: null
}

const App = (): JSX.Element => {
  const [spinner, setSpinner] = useState<boolean>(true)

  const dispatch = useDispatch()

  const getDataFromUrl = async (url: string, options: IUrlOptions): Promise<void> => {
    try {
      //TODO - zamienić data z Mock na data z res
      const res = await fetch(url, options)
      const data: ICitiesListFromUrl = await res.json()
      // const data: ICitiesListFromUrl = apiResponseCitiesMock
      dispatch(setCitiesList(data.cities))
    } catch (error) {
      console.log('error from getDataFromUrl - Cities List - function: ', error);
    }
    setSpinner(false)
  }

  useEffect(() => {
    getDataFromUrl(urlCitiesList, options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Navbar />
      {spinner ?
        <Spinner />
        :
        <Routes>
          <Route path='home' element={<HomePage />} />
          <Route path=':id' element={<CountryPage />} />
          <Route path='city/:id' element={<CityPage />} />
          <Route path='price-comparison' element={<PriceComparisonPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      }
      <Footer />
    </div>
  );
}

export default App;
