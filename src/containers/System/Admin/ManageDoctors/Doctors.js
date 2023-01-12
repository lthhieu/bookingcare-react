import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Select from 'react-select';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from '../../../../store/actions'
import * as utils from '../../../../utils'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class Doctors extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nameDoctors: [],
            contentHtmlVi: '',
            contentMarkDownVi: '',
            descriptionVi: '',
            contentHtmlEn: '',
            contentMarkDownEn: '',
            descriptionEn: '',
            selectedDoctor: null
        }
    }
    componentDidMount() {
        this.props.getNameDoctorsStart()
    }

    handleCreateNameDoctorOptions = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                let labelVi = `${item.fNameVi} ${item.lNameVi}`
                let labelEn = `${item.fNameEn} ${item.lNameEn}`
                object.label = language === utils.LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState) {
        let { nameDoctors, language, isCreatingDoctorInfo } = this.props
        if (prevProps.nameDoctors !== nameDoctors || prevProps.language !== language) {
            let nameOptions = this.handleCreateNameDoctorOptions(nameDoctors)
            this.setState({
                nameDoctors: nameOptions,
                selectedDoctor: null
            })
        }
        if (prevProps.isCreatingDoctorInfo !== isCreatingDoctorInfo && prevProps.isCreatingDoctorInfo === true && isCreatingDoctorInfo === false) {
            this.setState({
                contentMarkDownVi: '',
                descriptionVi: '',
                contentMarkDownEn: '',
                descriptionEn: '',
                selectedDoctor: null
            })
        }
    }
    // Finish!
    handleEditorChangeVi = ({ html, text }) => {
        this.setState({
            contentHtmlVi: html,
            contentMarkDownVi: text
        })
    }
    handleEditorChangeEn = ({ html, text }) => {
        this.setState({
            contentHtmlEn: html,
            contentMarkDownEn: text
        })
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor })
    };

    handleCreateDoctorInfo = () => {
        let { contentHtmlVi, contentMarkDownVi, descriptionVi, contentHtmlEn, contentMarkDownEn, descriptionEn, selectedDoctor } = this.state
        this.props.createDoctorInfoStart({
            contentHtmlVi, contentMarkDownVi, descriptionVi, contentHtmlEn, contentMarkDownEn, descriptionEn,
            doctorId: selectedDoctor.value
        })
    }
    handleChangeIntroduction = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    render() {
        let { selectedDoctor, descriptionVi, descriptionEn, nameDoctors, contentMarkDownVi, contentMarkDownEn } = this.state
        let { language } = this.props
        return (<>
            <div className='content-wrapper'>
                <div className="content-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h6 className="m-0 text-info"><FormattedMessage id='menu.admin.manage1' /> / <FormattedMessage id='menu.admin.manage1-details.detail4' /></h6>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                <div className='content'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h3 className='card-title'><FormattedMessage id='users.manage-doctors.title.title1' /></h3>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row mb-3'>
                                            <div className='col-6 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label1' /></label>
                                                <Select
                                                    placeholder={language === utils.LANGUAGES.VI ? <div>Nhập tên Bác sĩ..</div> : <div>Type to search..</div>}
                                                    value={selectedDoctor}
                                                    onChange={this.handleChange}
                                                    options={nameDoctors}
                                                />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-6 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label2' /></label>
                                                <textarea onChange={(e) => this.handleChangeIntroduction(e, 'descriptionVi')} value={descriptionVi} className='form-control' rows={5}>
                                                </textarea>
                                            </div>
                                            <div className='col-6 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label3' /></label>
                                                <textarea onChange={(e) => this.handleChangeIntroduction(e, 'descriptionEn')} value={descriptionEn} className='form-control' rows={5}>
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label4' /></label>
                                                <MdEditor value={contentMarkDownVi} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeVi} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label5' /></label>
                                                <MdEditor value={contentMarkDownEn} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeEn} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <Button onClick={() => this.handleCreateDoctorInfo()} color='primary'>
                                            <FormattedMessage id='users.manage-doctors.footer.button1' />
                                        </Button>&ensp;
                                        <Button color="secondary" >
                                            <FormattedMessage id='users.manage-doctors.footer.button3' />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        nameDoctors: state.doctor.nameDoctors,
        isCreatingDoctorInfo: state.doctor.isCreatingDoctorInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNameDoctorsStart: () => dispatch(actions.getNameDoctorsStart()),
        createDoctorInfoStart: (data) => dispatch(actions.createDoctorInfoStart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
