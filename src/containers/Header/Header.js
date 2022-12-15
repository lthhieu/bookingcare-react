import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import adminLTELogo from '../../assets/images/adminLTE/AdminLTELogo.png'

class Header extends Component {

    render() {
        const { processLogout } = this.props;

        return (
            <nav className="main-header navbar navbar-expand-md navbar-light navbar-white sticky-top">
                <div className="container">
                    <a href="../../index3.html" className="navbar-brand">
                        <img src={adminLTELogo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </a>
                    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                        {/* Left navbar links */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <div className='nav-link'>
                                    <Navigator menus={adminMenu} />
                                </div>

                            </li>
                            <li className="nav-item dropdown">
                                <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Dropdown</a>
                                <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow">
                                    <li><a href="#" className="dropdown-item">Some action </a></li>
                                    <li><a href="#" className="dropdown-item">Some other action</a></li>
                                    <li className="dropdown-divider" />
                                    {/* Level two dropdown*/}
                                    <li className="dropdown-submenu dropdown-hover">
                                        <a id="dropdownSubMenu2" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Hover for action</a>
                                        <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                                            <li>
                                                <a tabIndex={-1} href="#" className="dropdown-item">level 2</a>
                                            </li>
                                            {/* Level three dropdown*/}
                                            <li className="dropdown-submenu">
                                                <a id="dropdownSubMenu3" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">level 2</a>
                                                <ul aria-labelledby="dropdownSubMenu3" className="dropdown-menu border-0 shadow">
                                                    <li><a href="#" className="dropdown-item">3rd level</a></li>
                                                    <li><a href="#" className="dropdown-item">3rd level</a></li>
                                                </ul>
                                            </li>
                                            {/* End Level three */}
                                            <li><a href="#" className="dropdown-item">level 2</a></li>
                                            <li><a href="#" className="dropdown-item">level 2</a></li>
                                        </ul>
                                    </li>
                                    {/* End Level two */}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {/* Right navbar links */}
                    <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                        <li className="nav-item">
                            <div className="btn btn-logout" onClick={processLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            // <div className="header-container">
            //     {/* thanh navigator */}
            //     <div className="header-tabs-container">
            //         <Navigator menus={adminMenu} />
            //     </div>

            //     {/* nút logout */}

            // </div>
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
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
