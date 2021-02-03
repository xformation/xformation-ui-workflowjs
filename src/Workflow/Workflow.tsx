import React, { Component } from 'react';
import FormContent from './FormContent';
import './css/workflow.css';

export class Workflow extends Component<any, any> {
    formRef: any = null;
    constructor(props: any) {
        super(props);
        this.state = {
            data: this.props.formData,
            activeIndex: 0,
            loading: false,
        }
        this.formRef = React.createRef();
    };

    componentDidUpdate(prevProps: any, prevState: any) {
        if (JSON.stringify(prevProps.formData) !== JSON.stringify(this.props.formData)) {
            this.setState({
                data: this.props.formData,
                activeIndex: 0,
            });
        }
    }

    navigateTab(index: any) {
        const { data } = this.state;
        let length = data.length;
        if (index >= 0 && index <= length - 1) {
            this.setState({
                activeIndex: index
            });
        }
    }

    onClickNext = () => {
        const { activeIndex } = this.state;
        let data = this.formRef.current.getDataFromForm();
        if (data.isValid) {
            delete data.isValid;
            this.callApi(data);
        }
    };

    reFormateData = (data: any) => {
        let jsonData = {};
        Object.keys(data.formData).forEach((index) => {
            let row = data.formData[index];
            if (row.value) {
                jsonData = {
                    ...jsonData,
                    [row['name']]: row.value
                };
            }
        });
        return jsonData;
    }

    callApi = (jsonData: any) => {
        jsonData = this.reFormateData(jsonData);
        const { activeIndex, data } = this.state;
        if (data[activeIndex] && data[activeIndex].apiEndPoint) {
            let requestOptions: any = {
                method: "POST",
                body: JSON.stringify(jsonData)
            };
            if (this.props.getApiHeaders) {
                let headers = this.props.getApiHeaders();
                requestOptions = {
                    ...requestOptions,
                    headers
                };
            }
            this.setState({
                loading: true
            });
            let apiCall = fetch(data[activeIndex].apiEndPoint, requestOptions).then(response => response.json());
            apiCall.then(
                response => {
                    this.navigateTab(activeIndex + 1);
                    this.setState({
                        loading: false
                    });
                    if (this.props.onFormSubmitted) {
                        this.props.onFormSubmitted(activeIndex, response);
                    }
                },
                error => {
                    this.navigateTab(activeIndex + 1);
                    this.setState({
                        loading: false
                    });
                    if (this.props.onFormSubmitted) {
                        this.props.onFormSubmitted(activeIndex, error);
                    }
                }
            );
        } else if (this.props.onChangeTab) {
            this.setState({
                loading: true,
            });
            this.props.onChangeTab(activeIndex, jsonData);
        } else {
            this.navigateTab(activeIndex + 1);
        }
    };

    showNextTab = () => {
        this.setState({
            loading: false,
        });
        this.navigateTab(this.state.activeIndex + 1);
    };

    onSuccessfulCall = () => {
        this.setState({
            loading: false
        });
    };

    displayTabs = () => {
        const { data, activeIndex } = this.state;
        const retData = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            retData.push(
                <li key={`tab-${i}`} className={i === activeIndex ? 'active' : ''} onClick={(e) => this.navigateTab(i)}><a>{row.tabTitle}</a></li>
            );
        }
        return retData;
    }

    onChangeComponent = (e: any, componentIndex: any, type: any) => {
        const { activeIndex } = this.state;
        if (this.props.onChangeComponent) {
            this.props.onChangeComponent(e, type, activeIndex, componentIndex);
        }
    };

    displaytabContent = () => {
        const { data, activeIndex } = this.state;
        let tabData = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].content !== undefined && i === activeIndex) {
                tabData.push(
                    <FormContent key={`formcontent-${i}`} content={data[i]} ref={this.formRef} onChangeComponent={this.onChangeComponent} />
                );
            } else {
                tabData.push(
                    <div key={`formcontent-${i}`}></div>
                );
            }
        }
        return tabData;
    }

    render() {
        const { data, activeIndex, loading } = this.state;
        return (
            <div className="container">
                <div className="d-block workflow-tabs-container">
                    <ul>
                        {this.displayTabs()}
                    </ul>
                    <div className="workflow-tab-content">
                        {this.displaytabContent()}
                        <div className="d-block pre-next-buttons">
                            <button className={`blue-button ${activeIndex === 0 ? 'disable' : ''}`} onClick={(e) => this.navigateTab(activeIndex - 1)}>Previous</button>
                            {activeIndex !== data.length - 1 &&
                                <button className={`blue-button float-right m-r-0 ${(activeIndex === data.length - 1 || loading) ? 'disable' : ''}`} onClick={this.onClickNext} disabled={loading}>Next</button>
                            }
                            {activeIndex === data.length - 1 &&
                                <button className={`blue-button float-right m-r-0 ${(loading) ? 'disable' : ''}`} onClick={this.onClickNext} disabled={loading}>Finish</button>
                            }

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}