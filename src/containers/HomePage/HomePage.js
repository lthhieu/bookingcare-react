import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import BackToTop from './BackToTop';

class HomePage extends Component {

    render() {
        return (
            <div>
                <BackToTop />
                <Header />
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
