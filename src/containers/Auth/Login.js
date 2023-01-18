import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import * as utils from '../../utils'
import './Login.scss'
import Tooltip from '@mui/material/Tooltip';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShow: false
        }
    }
    handleOnChangeInput = (e, key) => {
        let copyState = { ...this.state }
        copyState[key] = e.target.value
        this.setState({
            ...copyState
        })
    }
    handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin()
        }
    }
    handleLogin = async () => {
        let { loginStart } = this.props
        let { email, password } = this.state
        let data = {}
        data.email = email
        data.password = password
        loginStart(data)
    }
    handleShowHidePassword = () => {
        let { isShow } = this.state
        this.setState({
            isShow: !isShow
        })
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language)
    }

    render() {
        let { email, password, isShow } = this.state
        let { language } = this.props
        let msgPass = ''
        if (language === utils.LANGUAGES.VI) {
            if (isShow) {
                msgPass = 'Ẩn mật khẩu'
            }
            else { msgPass = 'Hiện mật khẩu' }
        } else {
            if (isShow) {
                msgPass = 'Hide password'
            } else { msgPass = 'Show password' }
        }
        return (
            <div className="hold-transition login-page login-background">
                <div className="login-box">
                    <div className="card card-custom">
                        <div className="card-header text-center">
                            <div className='h1'><b><FormattedMessage id="login.title" /></b></div>
                        </div>
                        <div className="card-body">
                            <p className='login-box-msg'><FormattedMessage id="login.msg" /></p>
                            <div className="input-group mb-3">
                                <input onKeyDown={(e) => this.handlePressEnter(e)} onChange={(e) => this.handleOnChangeInput(e, "email")} value={email} type="text" className="form-control" placeholder='Email' />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input onKeyDown={(e) => this.handlePressEnter(e)} onChange={(e) => this.handleOnChangeInput(e, "password")} value={password} type={isShow ? 'text' : 'password'} className="form-control" placeholder={language === utils.LANGUAGES.VI ? 'Mật khẩu' : 'Password'} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <Tooltip placement='right' title={msgPass}>
                                            <span onClick={() => this.handleShowHidePassword()} className={isShow ? "fas fa-lock lock-custom" : "fas fa-lock-open lock-custom"} />
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button onClick={() => this.handleLogin()} type="button" className="btn btn-block btn-custom"><FormattedMessage id="login.btn-login" /></button>
                                </div>
                            </div>
                            {/* <div className="social-auth-links text-center mt-2 mb-3">
                                <a href="#" className="btn btn-block btn-primary">
                                    <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                                </a>
                                <a href="#" className="btn btn-block btn-danger">
                                    <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                                </a>
                            </div> */}
                            <div className="cus-login-footer mb-1">
                                <span className='forgot-password'><FormattedMessage id="login.forgot-password" /></span>
                                <div className='flag'>
                                    <Tooltip placement='left' title={language === utils.LANGUAGES.VI ? 'Tiếng Việt' : 'Vietnamese'}>
                                        <div onClick={() => this.handleChangeLanguage(utils.LANGUAGES.VI)} className={language === utils.LANGUAGES.VI ? 'vi active' : 'vi'}></div>
                                    </Tooltip>
                                    <Tooltip placement='right' title={language === utils.LANGUAGES.VI ? 'Tiếng Anh' : 'English'}>
                                        <div onClick={() => this.handleChangeLanguage(utils.LANGUAGES.EN)} className={language === utils.LANGUAGES.EN ? 'en active' : 'en'}></div>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginStart: (data) => dispatch(actions.loginStart(data)),
        changeLanguage: (data) => dispatch(actions.changeLanguage(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
