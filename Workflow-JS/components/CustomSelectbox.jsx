import React, { Component } from 'react';
export class CustomSelectbox extends Component {
    constructor(props) {
        super(props);
    }
    onChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    displayOptions = (optionData) => {
        let retData = [];
        const { id } = this.props;
        Object.keys(optionData).map((key, index) => {
            retData.push(
                <option key={`${id}-${optionData[index].value}`} value={optionData[index].value}>{optionData[index].label}</option>
            )
        });
        return retData;
    }
    render() {
        const { containerClass, labelClass, inputClass, label, htmlFor, id, name, value, isValid, message, options, notice } = this.props;
        return (
            <div className={containerClass}>
                <label className={labelClass} htmlFor={htmlFor}>{label}</label>
                <select className={`${inputClass} ${isValid ? '' : 'is-invalid error'}`} id={id} name={name} value={value} onChange={this.onChange} >
                    {this.displayOptions(options)}
                </select>
                {
                    !isValid &&
                    <div className="invalid-feedback">
                        {message}
                    </div>
                }
                <span>{notice}</span>
            </div>
        );
    }
}