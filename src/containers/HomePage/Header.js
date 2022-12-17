import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Header.scss'
import * as utils from '../../utils'
import * as actions from '../../store/actions'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language)
    }

    render() {
        let { language } = this.props
        return (<>
            <div className='header-container'>
                <div className='header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i>
                        <div className='logo'></div>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div className='title'><b><FormattedMessage id="header-content-center.title1" /></b></div>
                            <div className='sub-title'><FormattedMessage id="header-content-center.sub-title1" /></div>
                        </div>
                        <div className='child-content'>
                            <div className='title'><b><FormattedMessage id="header-content-center.title2" /></b></div>
                            <div className='sub-title'><FormattedMessage id="header-content-center.sub-title2" /></div>
                        </div>
                        <div className='child-content'>
                            <div className='title'><b><FormattedMessage id="header-content-center.title3" /></b></div>
                            <div className='sub-title'><FormattedMessage id="header-content-center.sub-title3" /></div>
                        </div>
                        <div className='child-content'>
                            <div className='title'><b><FormattedMessage id="header-content-center.title4" /></b></div>
                            <div className='sub-title'><FormattedMessage id="header-content-center.sub-title4" /></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'><i className="fas fa-question-circle">&nbsp;</i><FormattedMessage id="header-content-right.title" /></div>
                        <div className='flag'>
                            <div onClick={() => this.handleChangeLanguage(utils.LANGUAGES.VI)} className={language === utils.LANGUAGES.VI ? 'vi active' : 'vi'}></div>
                            <div onClick={() => this.handleChangeLanguage(utils.LANGUAGES.EN)} className={language === utils.LANGUAGES.EN ? 'en active' : 'en'}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='banner'>
                <div className='content-up'>
                    <div className='title'><FormattedMessage id="banner-up.title" /></div>
                    <div className='sub-title'><b><FormattedMessage id="banner-up.sub-title" /></b></div>
                    <div className='search'>
                        <i className="fas fa-search"></i>
                        {this.props.language === 'vi' ? <input type='text' placeholder='Tìm chuyên khoa khám bệnh' /> :
                            <input type='text' placeholder='Find a medical specialty' />}

                    </div>
                </div>
                <div className='content-down'>
                    <div className='options'>
                        <div className='child-option'>
                            <div className='child-icon'><i className="fas fa-hospital"></i></div>
                            <div className='child-text'><b><FormattedMessage id="banner-down.option1" /></b></div>
                        </div>
                        <div className='child-option'>
                            <div className='child-icon'><i className="fas fa-phone-alt"></i></div>
                            <div className='child-text'><b><FormattedMessage id="banner-down.option2" /></b></div>
                        </div>
                        <div className='child-option'>
                            <div className='child-icon'><i className="fas fa-heartbeat"></i></div>
                            <div className='child-text'><b><FormattedMessage id="banner-down.option3" /></b></div>
                        </div>
                        <div className='child-option'>
                            <div className='child-icon'><i className="fas fa-flask"></i></div>
                            <div className='child-text'><b><FormattedMessage id="banner-down.option4" /></b></div>
                        </div>
                        <div className='child-option'>
                            <div className='child-icon'><i className="fas fa-user-md"></i></div>
                            <div className='child-text'><b><FormattedMessage id="banner-down.option5" /></b></div>
                        </div>
                        <div className='child-option'>
                            <div className='child-icon'><i className="fas fa-tooth"></i></div>
                            <div className='child-text'><b><FormattedMessage id="banner-down.option6" /></b></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: (data) => dispatch(actions.changeLanguage(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
