import React, { Component } from 'react';
import { CustomTextbox } from './components/CustomTextbox';
import { CustomSelectbox } from './components/CustomSelectbox';
import { CustomTextArea } from './components/CustomTextArea';
import { CustomRadioCheckbox } from './components/CustomRadioCheckbox';

export const componentType = {
    TEXT: "text",
    RADIO: "radio",
    CHECK_BOX: "checkbox",
    NUMBER: "number",
    DATE: "DATE",
    TEXT_AREA: "textarea",
    SELECTBOX: "select"
};

class FormContent extends Component {
    constructor(props) {
        super(props);
        const { content } = props;
        this.state = {
            title: content.title,
            subHeading: content.subHeading,
            formData: content.content,
            isSubmitted: this.props.isSubmittedStatus,
        }
    };

    updateForm = (content) => {
        this.setState({
            title: content.title,
            subHeading: content.subHeading,
            formData: content.content
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.content) !== JSON.stringify(this.props.content)) {
            const { content } = this.props;
            this.setState({
                title: content.title,
                subHeading: content.subHeading,
                formData: content.content,
                isSubmitted: this.props.isSubmittedStatus,
            });
        }
    }

    handleStateChange = (e, index, type) => {
        const { formData } = this.state;
        const { name, value, checked } = e.target;
        if (type === componentType.RADIO) {
            formData[index].value = [value];
        } else if (type === componentType.CHECK_BOX) {
            if (checked) {
                formData[index].value.push(value);
            } else {
                const i = formData[index].value.indexOf(value);
                formData[index].value.splice(i, 1);
            }
        } else {
            formData[index].value = value;
        }
        this.setState({
            formData
        });
    };

    validate = (isSubmitted) => {
        const { formData } = this.state;
        const validObj = {
            isValid: true,
            message: ""
        };
        let isValid = true;
        let retData = [];
        for (let i = 0; i < formData.length; i++) {
            let data = formData[i];
            retData.push(validObj);
        }
        if (isSubmitted) {
            for (let i = 0; i < formData.length; i++) {
                let formItem = formData[i];
                if (formItem.isRequired) {
                    if (!formItem.value) {
                        retData[i] = {
                            isValid: false,
                            message: formItem.errorMessage
                        };
                        isValid = false;
                    } else {
                        if (formItem.validation && formItem.validation.length > 0) {
                            for (let j = 0; j < formItem.validation.length; j++) {
                                let isItemValid = this.validateValue(formItem.value, formItem.validation[j].regEx);
                                if (!isItemValid) {
                                    retData[i] = {
                                        isValid: isItemValid,
                                        message: formItem.validation[j].message
                                    };
                                    isValid = false;
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    if (formItem.value && formItem.validation && formItem.validation.length > 0) {
                        for (let j = 0; j < formItem.validation.length; j++) {
                            let isItemValid = this.validateValue(formItem.value, formItem.validation[j].regEx);
                            if (!isItemValid) {
                                retData[i] = {
                                    isValid: isItemValid,
                                    message: formItem.validation[j].message
                                };
                                isValid = false;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return {
            errorData: retData,
            isValid
        };
    };

    validateValue = (value, regEx) => {
        return regEx.test(value);
    }

    displayFormData = () => {
        const { isSubmitted, formData } = this.state;
        const { errorData, isValid } = this.validate(isSubmitted);
        let retData = [];
        for (let j = 0; j < formData.length; j++) {
            let data = formData[j];
            retData.push(
                this.displayformField(data, errorData[j], j)
            );
        }
        return retData;
    }

    getDataFromForm = () => {
        this.setState({
            isSubmitted: true
        });
        let errorData = this.validate(true);
        return {
            isValid: errorData.isValid,
            formData: this.state.formData
        };
    };

    displayformField = (formData, error, index) => {
        let frmData = [];
        if (formData.type === componentType.TEXT || formData.type === componentType.NUMBER || formData.type === componentType.DATE) {
            frmData.push(
                <CustomTextbox key={formData.id} containerClass="form-group" type={formData.type} inputClass="form-control" htmlFor={formData.name} id={formData.name} placeHolder={formData.placeHolder} name={formData.name} value={formData.value} onChange={(e) => this.handleStateChange(e, index, formData.type)} isValid={error.isValid} message={error.message} notice={formData.notice} label={formData.title} />
            );
        } else if (formData.type === componentType.TEXT_AREA) {
            frmData.push(
                <CustomTextArea key={formData.id} containerClass="form-group" rows={5} inputClass="form-control textarea" htmlFor={formData.name} id={formData.name} name={formData.name} value={formData.value} onChange={(e) => this.handleStateChange(e, index, formData.type)} isValid={error.isValid} message={error.message} notice={formData.notice} label={formData.title} />
            );
        } else if (formData.type === componentType.SELECTBOX) {
            frmData.push(
                <CustomSelectbox key={formData.id} containerClass="form-group" inputClass="form-control" htmlFor={formData.id} id={formData.id} name={formData.name} value={formData.value} options={formData.options} onChange={(e) => this.handleStateChange(e, index, formData.type)} isValid={error.isValid} message={error.message} label={formData.title} notice={formData.notice} />
            );
        } else if (formData.type === componentType.RADIO || formData.type === componentType.CHECK_BOX) {
            frmData.push(
                <CustomRadioCheckbox key={formData.id} containerClass="form-group" inputClass="form-control d-inline-block w-auto p-0" type={formData.type} htmlFor={formData.id} id={formData.id} name={formData.name} value={formData.value} options={formData.options} onChange={(e) => this.handleStateChange(e, index, formData.type)} isValid={error.isValid} message={error.message} label={formData.title} notice={formData.notice} />
            );
        }
        return frmData;
    }

    render() {
        const { subHeading, title } = this.state;
        return (
            <div className="tab-pane">
                <h2>{title}</h2>
                <p>{subHeading}</p>
                {this.displayFormData()}
            </div>
        );
    }
}

export default FormContent;