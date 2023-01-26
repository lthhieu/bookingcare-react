import React, { Component } from 'react'
import { connect } from "react-redux"
import { FormattedMessage } from 'react-intl'
import * as utils from '../../../utils'
import * as actions from '../../../store/actions'
import Header from '../../HomePage/Header'
import CircularProgress from '@mui/material/CircularProgress';
class VerifyBookingAppointment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVerify: false,
            isExisted: false
        }
        this.listenEmitter()
    }
    listenEmitter = () => {
        utils.emitter.on('VERIFIED SUCCESSFULLY', () => {
            this.setState({ isVerify: true })
        })
        utils.emitter.on('THE APPOINTMENT IS NOT EXISTED', () => {
            this.setState({ isVerify: true, isExisted: true })
        })
    }
    componentDidMount() {
        let { location } = this.props
        if (location && location.search) {
            let search = location.search
            let params = new URLSearchParams(search)
            const token = params.get('token')
            const doctorId = params.get('doctorId')
            this.props.verifyBookingAppointmentStart({
                token, doctorId
            })
        }
    }

    render() {
        let { isVerify, isExisted } = this.state
        return (
            <>
                <Header home={true} />
                {!isVerify ? <div className='verify-progress'><CircularProgress /></div> :
                    <div className='verify-msg'>{!isExisted ?
                        <p style={{ color: '#49bce2' }}><FormattedMessage id='verify-booking.msg1' /></p>
                        : <p style={{ color: 'red' }}><FormattedMessage id='verify-booking.msg2' /></p>
                    }</div>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verifyBookingAppointmentStart: (data) => dispatch(actions.verifyBookingAppointmentStart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBookingAppointment);
