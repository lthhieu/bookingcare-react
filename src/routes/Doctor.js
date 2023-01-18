import React, { Component } from 'react'
import { connect } from "react-redux"
import Header from '../containers/Header/Header';
import Footer from '../containers/HomePage/Footer';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule'

import { Redirect, Route, Switch } from 'react-router-dom';

class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                        </Switch>
                    </div>
                </div>
                {isLoggedIn && <Footer />}
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
