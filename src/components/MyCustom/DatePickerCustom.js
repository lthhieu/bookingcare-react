import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi'
import enUS from 'date-fns/locale/en-US'
import * as utils from '../../utils'
import { range } from 'lodash';
import { getYear, getMonth } from 'date-fns';

class DatePickerCustom extends Component {

    render() {
        let { language, handleChangeDate, minDate, selectedDate } = this.props
        let years = range(1970, getYear(new Date()) + 1, 1)
        let monthsEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let monthsVi = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
        let months = language === utils.LANGUAGES.VI ? monthsVi : monthsEn
        return (
            <DatePicker
                renderCustomHeader={({
                    date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled,
                }) => (
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "0.1rem" }}>
                        <button className='btn' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            <i className='fas fa-arrow-circle-left'></i>
                        </button>
                        <select className='custom-select' value={getYear(date)} onChange={({ target: { value } }) => changeYear(value)}>
                            {years.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <select className='custom-select' value={months[getMonth(date)]} onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))}>

                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <button className='btn' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            <i className='fas fa-arrow-circle-right'></i>
                        </button>
                    </div>
                )}
                selected={selectedDate}
                onChange={handleChangeDate}

                minDate={minDate ? minDate : null}
                className='form-control'
                dateFormat="dd/MM/yyyy"
                isClearable
                locale={language === utils.LANGUAGES.VI ? vi : enUS}
                placeholderText={language === utils.LANGUAGES.VI ? 'Chọn ngày..' : 'Choose date..'}
            />
            // <DatePicker
            //     // filterDate={this.isWeekday}
            //     minDate={minDate ? minDate : null}
            //     locale={language === utils.LANGUAGES.VI ? vi : enUS}
            //     dateFormat="dd/MM/yyyy"
            //     isClearable
            //     placeholderText={language === utils.LANGUAGES.VI ? 'Chọn ngày..' : 'Choose date..'}
            //     className='form-control'
            //     selected={selectedDate}
            //     onChange={handleChangeDate} />
        )
    }
}
export default DatePickerCustom