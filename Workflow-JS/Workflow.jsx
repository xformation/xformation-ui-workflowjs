import React, { Component } from 'react';
import FormContent from './FormContent';
import './css/workflow.css';

export class Workflow extends Component {
    formRef = null;
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.formData,
            currentTab: 0,
            activeIndex: 0,
            waitForResponse: this.props.waitForResponse,
            loading: false
        }
        this.formRef = React.createRef();
    };

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.formData) !== JSON.stringify(this.props.formData)) {
            this.setState({
                data: this.props.formData,
                currentTab: 0,
                activeIndex: 0,
            });
        }
    }

    navigateTab(index) {
        const { data } = this.state;
        let length = data.length;
        if (index >= 0 && index <= length - 1) {
            this.setState({
                activeIndex: index
            });
        }
    }

    onClickNext = () => {
        const { activeIndex, waitForResponse } = this.state;
        let data = this.formRef.current.getDataFromForm();
        if (data.isValid) {
            this.props.onClickNext(activeIndex, data);
            if (!waitForResponse) {
                this.navigateTab(activeIndex + 1);
            } else {
                this.setState({
                    loading: true
                });
            }
        }
    };

    showNextTab = () => {
        const { activeIndex } = this.state;
        this.navigateTab(activeIndex + 1);
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

    displaytabContent = () => {
        const { data, activeIndex } = this.state;
        let tabData = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].content !== undefined && i === activeIndex) {
                tabData.push(
                    <FormContent key={`formcontent-${i}`} content={data[i]} ref={this.formRef} />
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
                <div className="d-block tabs-container">
                    <ul>
                        {this.displayTabs()}
                    </ul>
                    <div className="tab-content">
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