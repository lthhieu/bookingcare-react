import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Facility from './Section/Facility';
import Specialty from './Section/Specialty';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Doctor from './Section/Doctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import Footer from './Footer';
import Banner from './Banner';

class HomePage extends Component {


    render() {
        let settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        }
        return (
            <div>
                <Header home={true} />
                <Banner />
                <Specialty settings={settings} />
                <Facility settings={settings} />
                <Doctor settings={settings} />
                <Handbook />
                <About />
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
