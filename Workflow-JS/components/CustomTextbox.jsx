import React, { Component } from 'react';
export class CustomTextbox extends Component {
    constructor(props) {
        super(props);
    }
    onChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };
    render() {
        const { containerClass, labelClass, inputClass, label, htmlFor, id, name, placeHolder, value, isValid, message, type, notice } = this.props;
        return (
            <div className={containerClass}>
                <label className={labelClass} htmlFor={htmlFor}>{label}</label>
                <input type={type} className={`${inputClass} ${isValid ? '' : 'is-invalid error'}`} id={id} name={name} value={value} placeholder={placeHolder} onChange={this.onChange} />
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