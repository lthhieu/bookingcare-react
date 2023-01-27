import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick"
import * as actions from '../../../store/actions'
import * as utils from '../../../utils'
import { withRouter } from 'react-router';
class Specialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            specialties: []
        }
    }
    componentDidMount() {
        this.props.fetchSpecialtyHomeStart()
    }
    async componentDidUpdate(prevProps, prevState) {
        let { specialties } = this.props
        if (prevProps.specialties !== specialties) {
            this.setState({
                specialties
            })
        }
    }
    handleClickDetailSpecialty = (id) => {
        this.props.history.push(`/specialty/${id}`)
    }
    render() {
        let { specialties } = this.state
        let { language } = this.props
        return (
            <div className='section section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='header-title'><FormattedMessage id='sections.specialties' /></span>
                        <button className='header-button'><FormattedMessage id='sections.button' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {specialties && specialties.length > 0 &&
                                specialties.map((item, index) => {
                                    let objectUrl = '', imageBase64 = ''
                                    if (item.image.data.length !== 0) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('ascii')
                                        let blob = utils.CommonUtils.b64toBlob(imageBase64)
                                        objectUrl = URL.createObjectURL(blob)
                                    } else {
                                        objectUrl = ''
                                    }
                                    return (
                                        <div onClick={() => this.handleClickDetailSpecialty(item.id)} className='section-child' key={index}>
                                            <div style={{ backgroundImage: `url(${objectUrl})` }} className='section-img section-specialty'></div>
                                            <div className='section-descript'>{language === utils.LANGUAGES.VI ? item.nameVi : item.nameEn}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        specialties: state.homepage.specialties
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialtyHomeStart: () => dispatch(actions.fetchSpecialtyHomeStart())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty))
