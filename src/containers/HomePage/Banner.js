import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as actions from '../../store/actions'

class Banner extends Component {
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
            <div className='banner'>
                <div className='content-up'>
                    <div className='title'><FormattedMessage id="banner-up.title" /></div>
                    <div className='sub-title'><b><FormattedMessage id="banner-up.sub-title" /></b></div>
                    <div className='search'>
                        <i className="fas fa-search"></i>
                        <input type='text' placeholder={language === 'vi' ? 'Tìm chuyên khoa khám bệnh' : 'Find a medical specialty'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
