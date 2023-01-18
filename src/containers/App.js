import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter as Router } from 'connected-react-router'
import { history } from '../redux'
import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication'
import * as utils from '../utils'
import Home from '../routes/Home'
import Login from './Auth/Login'
import System from '../routes/System'
import HomePage from './HomePage/HomePage'
import CustomScrollbars from '../components/CustomScrollbars'
import DetailDoctor from './Patients/Doctors/DetailDoctor'
import Doctor from '../routes/Doctor'

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props
        let { bootstrapped } = persistor.getState()
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }))
            } else {
                this.setState({ bootstrapped: true })
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState()
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    {/* <CustomScrollbars style={{ height: '100vh', width: '100%' }}> */}
                    <div className="main-container">
                        <div className="content-container">
                            <Switch>
                                <Route path={utils.path.HOME} exact component={(Home)} />
                                <Route path={utils.path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={utils.path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={utils.path.MANAGE_SCHEDULE} component={userIsAuthenticated(Doctor)} />
                                <Route path={utils.path.HOMEPAGE} component={(HomePage)} />
                                <Route path={utils.path.DETAIL_DOCTOR} component={(DetailDoctor)} />
                            </Switch>
                        </div>
                        <ToastContainer />
                    </div>
                    {/* </CustomScrollbars> */}
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)