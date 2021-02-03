import React, { Component } from 'react';
export class CustomFile extends Component {
    constructor(props) {
        super(props);
    }
    onChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };
    render() {
        const { containerClass, labelClass, inputClass, label, htmlFor, isRequired, id, name, value, isValid, message, type, notice } = this.props;
        return (
            <div className={containerClass}>
                <label className={labelClass} htmlFor={htmlFor}>{label}{isRequired == true && <span className="required"> * </span>}</label>
                <input type={type} className={`${inputClass} ${isValid ? '' : 'is-invalid error'}`} id={id} name={name} value={value} onChange={this.onChange} />
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