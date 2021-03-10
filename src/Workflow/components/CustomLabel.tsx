import React, { Component } from 'react';
export class CustomLabel extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    onChange = (e: any) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };
    render() {
        const { containerClass, labelClass, inputClass, label, htmlFor, value, isValid, message, type, notice } = this.props;
        return (
            <div className={containerClass}>
                <label className={labelClass} htmlFor={htmlFor}>{label}: {value}</label>
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