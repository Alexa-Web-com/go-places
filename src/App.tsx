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

const App = (): JSX.Element => {
  const [spinner, setSpinner] = useState<boolean>(true)

  const dispatch = useDispatch()

  const getDataFromUrl = async (url: string, options: IUrlOptions): Promise<void> => {
    try {
      const res = await fetch(url, options)
      const data: ICitiesListFromUrl = await res.json()
      dispatch(setCitiesList(data.cities))
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setSpinner(false)
    }
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
