import React from "react";

import Header from "../components/Header";
import HomeBody from "../components/HomeBody";
import Footer from "../components/Footer";

import "../styles/home.css";

const Home = () => {

    return (

        <div className="home-page">

            <Header />

            <HomeBody />

            <Footer />

        </div>

    );
};

export default Home;