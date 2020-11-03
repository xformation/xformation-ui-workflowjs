import React from 'react';
import { Workflow, componentType } from './Workflow';
class App extends React.Component<any, any> {
  workflowRef: any = null;
  constructor(props: any) {
    super(props);
    this.state = {
      data: [
        {
          title: 'Event Details',
          tabTitle: 'Event Details',
          subHeading: 'This is sub heading',
          content: [
            {
              title: 'Gender',
              name: "gender",
              type: componentType.RADIO,
              value: [],
              placeHolder: '',
              isRequired: false,
              id: "gender",
              notice: 'Choose Your hobby',
              options: [
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]
            },
            {
              title: 'Hobby',
              type: componentType.CHECK_BOX,
              name: "hobby",
              isRequired: false,
              value: [],
              notice: 'Choose Your hobby',
              id: "hobby",
              options: [
                { value: 'Sports', label: 'Sports' },
                { value: 'Music', label: 'Music' },
                { value: 'Reading', label: 'Reading' },
                { value: 'Driving', label: 'Driving' },
                { value: 'Dancing', label: 'Dancing' },
              ]
            },
            {
              title: 'Email',
              name: "email",
              type: componentType.TEXT,
              isRequired: false,
              value: "",
              placeHolder: 'Your Email',
              notice: 'We don\'t share email',
              errorMessage: "Please enter your email",
              id: "email",
              validation: [{
                regEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter valid email"
              }]
            },
            {
              title: 'Title',
              name: "title",
              type: componentType.TEXT,
              value: "",
              placeHolder: 'Your Name',
              isRequired: false,
              id: "title",
              notice: 'Title for this Event Defination, Events and Alerts created from it.',
              errorMessage: "Please enter your name",
            },
            {
              title: 'Description(Optional)',
              name: "description",
              type: componentType.TEXT_AREA,
              isRequired: false,
              value: "",
              placeHolder: '',
              notice: 'Longer description for this Event Definition.',
              errorMessage: "Please enter your name",
              id: "description",
            },
            {
              title: 'Subject',
              name: "subject",
              type: componentType.TEXT,
              isRequired: false,
              value: "",
              placeHolder: 'Subject',
              notice: '',
              id: "subject",
            },
            {
              title: 'Priority',
              type: componentType.SELECTBOX,
              name: "priority",
              isRequired: false,
              value: "",
              notice: 'Choose the priority for Events create from this Definition.',
              id: "priority",
              options: [
                { value: "", label: "Select" },
                { value: "0", label: 'Low' },
                { value: "1", label: 'High' },
                { value: "3", label: 'Normal' }
              ]

            },
          ]
        },
        {
          title: 'Event Condition',
          tabTitle: 'Condition',
          subHeading: "Configure how Graylog should create Events of this kind. You can later use those Events as input on other Conditions, making it possible to build powerful Conditions based on others.",
          content: [
            {
              title: 'Condition Type',
              name: "conditiontype",
              type: componentType.SELECTBOX,
              isRequired: false,
              value: "",
              notice: 'Choose the type of Condition for this Event.',
              id: "condition1",
              options: [
                { value: "0", label: 'Low' },
                { value: "1", label: 'High' },
                { value: '2', label: 'Normal' }
              ]
            }
          ]
        },
        {
          title: 'Title',
          tabTitle: 'Fields',
          subHeading: '',
          content: [
            {
              title: 'Name',
              name: "name",
              type: componentType.TEXT,
              isRequired: false,
              value: "",
              placeHolder: 'Your Name',
              notice: '',
              id: "name"
            },
            {
              title: 'Email',
              name: "email",
              type: componentType.TEXT,
              isRequired: false,
              value: "",
              placeHolder: 'Your Email',
              notice: 'We don\'t share email',
              validation: [{
                regEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter valid email"
              }],
              id: "email1"
            },
            {
              title: 'Contact Number',
              name: "contact",
              type: componentType.TEXT,
              // regEx: '/^\d+$/',
              isRequired: false,
              value: "",
              placeHolder: 'Your Contact Number',
              notice: 'Enter your 10 digits contact number',
              id: "contact"
            },
            {
              title: 'Address(Optional)',
              name: "address",
              type: componentType.TEXT_AREA,
              isRequired: false,
              value: "",
              placeHolder: '',
              notice: '',
              id: "address"
            },
            {
              title: 'Birth Date',
              name: "birthdate",
              type: componentType.DATE,
              isRequired: false,
              value: "",
              placeHolder: '',
              notice: '',
              id: "birtdate"
            },
            {
              title: 'Gender',
              name: "gender",
              type: componentType.RADIO,
              value: "",
              placeHolder: '',
              isRequired: false,
              notice: '',
              options: [
                { value: "0", label: 'Male' },
                { value: "1", label: 'Female' },
              ],
              id: "gender1"
            },
          ]
        },
      ],
    };
    this.workflowRef = React.createRef();
  }

  onClickNext = (index: any, tabData: any) => {
    console.log(tabData);
    setTimeout(() => {
      this.workflowRef.current.showNextTab();
    }, 3000);
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Workflow formData={data} onClickNext={this.onClickNext} ref={this.workflowRef} waitForResponse={true} />
      </div>
    );
  }
}

export default App;
