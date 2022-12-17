import React, { Component } from 'react';
import './BackToTop.scss'


class BackToTop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            backToTop: false
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.scrollFunction);
    }

    scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            this.setState({ backToTop: true })
        } else {
            this.setState({ backToTop: false })
        }
    }
    handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }

    render() {
        return (<>
            {this.state.backToTop ?
                <div onClick={() => this.handleBackToTop()} style={{ display: 'block' }} className='back-to-top fade-in'><i className="fas fa-arrow-up"></i></div> :
                <div className='back-to-top fade-out'><i className="fas fa-arrow-up"></i></div>}
        </>
        );
    }

}



export default BackToTop
