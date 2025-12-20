import React from 'react';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Outlet } from 'react-router';
import Top from './scroll/Top';
import ScrollToTop from './scroll/ScrollTop';
const App = () => {
  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <Top></Top>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default App;