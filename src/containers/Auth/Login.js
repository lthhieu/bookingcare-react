import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import * as services from '../../services';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShow: false,
            msg: ''
        }
    }
    handleOnChangeInput = (e, field) => {
        this.setState({
            [field]: e.target.value
        })
    }
    handleLogin = async () => {
        let { userLoginSuccess } = this.props
        this.setState({
            msg: ''
        })
        let { email, password } = this.state
        try {
            let response = await services.handleLoginApi(email, password)
            console.log(response)
            if (response && response.errCode === 1) {
                this.setState({
                    msg: response.msg
                })
            } else if (response && response.errCode === 0) {
                userLoginSuccess(response.data)
            }
        } catch (e) {
            console.log('>>>', e.response)
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        msg: e.response.data.msg
                    })
                }
            }

        }

    }
    handleShowHidePassword = () => {
        let { isShow } = this.state
        this.setState({
            isShow: !isShow
        })
    }

    render() {
        let { email, password, isShow, msg } = this.state
        return (
            <div className="hold-transition login-page login-background">
                <div className="login-box">
                    <div className="card card-custom">
                        <div className="card-header text-center">
                            <span className='h1'><b>Log in</b></span>
                        </div>
                        <div className="card-body">
                            {msg === '' ? <p className='login-box-msg'>Log in to start your session</p> :
                                <p className='login-box-msg text-danger'>{msg}</p>}
                            <div className="input-group mb-3">
                                <input onChange={(e) => this.handleOnChangeInput(e, "email")} value={email} type="text" className="form-control" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input onChange={(e) => this.handleOnChangeInput(e, "password")} value={password} type={isShow ? 'text' : 'password'} className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span onClick={() => this.handleShowHidePassword()} className={isShow ? "fas fa-lock lock-custom" : "fas fa-lock-open lock-custom"} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button onClick={() => this.handleLogin()} type="button" className="btn btn-block btn-custom">Log In</button>
                                </div>
                            </div>
                            <div className='text-center my-1 mb-1'>
                                <span><b>---OR---</b></span>
                            </div>
                            <div className="social-auth-links text-center mt-2 mb-3">
                                <a href="#" className="btn btn-block btn-primary">
                                    <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                                </a>
                                <a href="#" className="btn btn-block btn-danger">
                                    <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                                </a>
                            </div>
                            <p className="mb-1 pwd-text-custom">
                                <span>I forgot my password</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
