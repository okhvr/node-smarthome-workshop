import React, { PureComponent } from 'react';
import { addGroup } from '../api';
import GroupsForm from '../components/GroupsForm';
import {getDevices} from '../api';

export default class GroupsAdd extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            devices: []
        }
    }

    componentDidMount() {
        this.refreshDevices();
    }

    refreshDevices = async () => {
        this.setState({
            devices: await getDevices()
        });
    };

    handleFormSubmit = async (group) => {
        await addGroup(group);
        window.history.back();
    };

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#/">Home</a></li>
                                <li className="breadcrumb-item"><a href="#/devices">Groups</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Add group</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <GroupsForm devices={this.state.devices}
                            onSubmit={this.handleFormSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}