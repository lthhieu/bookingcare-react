import React, { Component } from 'react'
import { connect } from "react-redux"
import { FormattedMessage } from 'react-intl'
import Header from '../../HomePage/Header';
import * as actions from '../../../store/actions'
class SpecialtyDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorId: null,
            showName: false, nameVi: '', nameEn: ''
        }
    }
    async componentDidMount() {
        window.addEventListener('scroll', this.scrollFunction)
        let { match, fetchAllNameSpecialtiesStart } = this.props
        if (match && match.params && match.params.id) {
            this.setState({ doctorId: match.params.id })
            await fetchAllNameSpecialtiesStart(match.params.id)
        }
    }
    scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            this.setState({ showName: true })
        } else {
            this.setState({ showName: false })
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        let { allNameSpecialties } = this.props
        console.log(allNameSpecialties)
        if (prevProps.allNameSpecialties !== allNameSpecialties) {
            this.setState({
                nameVi: allNameSpecialties.nameVi,
                nameEn: allNameSpecialties.nameEn
            })
        }
    }

    render() {
        let { showName, nameVi, nameEn } = this.state
        let { language } = this.props
        return (<>
            <Header
                showName={showName}
                nameVi={nameVi}
                nameEn={nameEn}
            />
            <div>hello world from detail specialty</div>
        </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allNameSpecialties: state.specialty.allNameSpecialties,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllNameSpecialtiesStart: (id) => dispatch(actions.fetchAllNameSpecialtiesStart(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
