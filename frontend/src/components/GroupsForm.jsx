import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { groupPropType } from '../constants';

export default class GroupsForm extends PureComponent {
    handleCancelClick = () => {
        window.history.back();
    };

    handleSubmit = (event) => {
        const selectedOptionіonsValues = Array.from(event.target.devicesOptions.selectedOptions)
            .map(option => option.value);
        const selectedOptions = selectedOptionіonsValues
            .map(value => this.props.devices.find(device => device.name === value));
        this.props.onSubmit({
            ...this.props.group,
            name: event.target.groupName.value,
            devices: selectedOptions 
        });

        event.preventDefault();
    };

    render() {
        const {group} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="deviceName">Group Name</label>
                    <input type="text"
                           className="form-control"
                           id="groupName"
                           name="groupName"
                           placeholder="Group Name"
                           required
                           defaultValue={group.name}/>
                </div>

                <div className="form-group">
                    <label htmlFor="devicesOptions">Select devices</label>
                    <select multiple className="form-control" id="devicesOptions">
                        {this.props.devices.map((device) =>
                            <option key={device.id} selected={this.props.group.devices.some(d => d.id === device.id)}>{device.name}</option>
                        )}
                    </select>
                </div>


                <div className="float-right">
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <button type="button" className="btn btn-default" onClick={this.handleCancelClick}>Cancel</button>
                </div>
            </form>
        );
    }
}

GroupsForm.defaultProps = {
    group: {
        name: 'new group',
    }
};

GroupsForm.propTypes = {
    group: groupPropType,
    onSubmit: PropTypes.func.isRequired
};