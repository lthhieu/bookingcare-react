import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as utils from '../../utils'
import * as actions from '../../store/actions'
import './HomePage.scss'
import { withRouter } from 'react-router'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    async componentDidUpdate(prevProps, prevState) {
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language)
    }
    handleComeback = () => {
        let { history } = this.props
        if (history) {
            history.push(utils.path.HOMEPAGE)
        }

    }

    render() {
        let { language, nameEn, nameVi, showName } = this.props
        return (<>{this.props.home ?
            <div className='header-container'>
                <div className='header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i>
                        <div onClick={() => this.handleComeback()} className='logo'></div>
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
                            <div title='Việt Nam' onClick={() => this.handleChangeLanguage(utils.LANGUAGES.VI)} className={language === utils.LANGUAGES.VI ? 'vi active' : 'vi'}></div>
                            <div title='English' onClick={() => this.handleChangeLanguage(utils.LANGUAGES.EN)} className={language === utils.LANGUAGES.EN ? 'en active' : 'en'}></div>
                        </div>
                    </div>
                </div>
            </div> : <>
                <div className='header-container header-detail'>
                    <div className='header-content header-content-detail'>
                        <div className='left-content left-content-detail'>
                            <i onClick={() => this.handleComeback()} className="fa-solid fa-arrow-left"></i>
                            <div style={{ display: showName ? 'block' : 'none' }} className='doctor-name-header' >{language === utils.LANGUAGES.VI ? nameVi : nameEn}</div>
                        </div>
                        <div className='right-content right-content-detail'>
                            <div className='support suport-detail'><i className="fas fa-question-circle">&nbsp;</i><FormattedMessage id="header-content-right.title" /></div>
                            <div className='flag'>
                                <div title='Việt Nam' onClick={() => this.handleChangeLanguage(utils.LANGUAGES.VI)} className={language === utils.LANGUAGES.VI ? 'vi active' : 'vi'}></div>
                                <div title='English' onClick={() => this.handleChangeLanguage(utils.LANGUAGES.EN)} className={language === utils.LANGUAGES.EN ? 'en active' : 'en'}></div>
                            </div>
                            <div className='bar'>
                                <i className="fas fa-bars"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }</>
        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
