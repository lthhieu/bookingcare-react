import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class Footer extends Component {

    render() {
        return (
            <div className='footer-cus main-footer'>
                <div className='footer-left'>
                    &copy; Clone Bookingcare.vn by Ly Tran Hoang Hieu
                </div>
                <div className='footer-right'>
                    <a target='_blank' href='https://github.com/lthhieu/bookingcare'>
                        <i className="fab fa-github cus-hover-icon"></i>
                    </a>
                    <a target='_blank' href='https://www.facebook.com/HongGam.always.in.myheart.4916'>
                        <i className="fab fa-facebook cus-hover-icon"></i>
                    </a>
                    <a target='_blank' href='https://www.youtube.com/playlist?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI'>
                        <i className="fa-brands fa-youtube cus-hover-icon"></i>
                    </a>
                </div>
            </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
