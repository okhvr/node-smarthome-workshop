import React, { PureComponent } from 'react';
import GroupsForm from '../components/GroupsForm';
import { getGroupById, updateGroup, getDevices } from '../api';

export default class DeviceEdit extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            group: null
        }
    }

    componentDidMount = async () => {
        this.refreshDevices();
        const { id } = this.props.match.params;
var a = await getGroupById(id);
console.log('========', a);
        this.setState({
            group: await getGroupById(id)
        });
    }

    refreshDevices = async () => {
        this.setState({
            devices: await getDevices()
        });
    };

    handleFormSubmit = async (group) => {
        const { id } = this.props.match.params;

        await updateGroup(id, group);
        window.history.back();
    };

    render() {
        const { group } = this.state;

        if (!group) {
            return null;
        }

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#/">Home</a></li>
                                <li className="breadcrumb-item"><a href="#/groups">Groups</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Edit group</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <GroupsForm onSubmit={this.handleFormSubmit} group={group} devices={this.state.devices}/>
                    </div>
                </div>
            </div>
        );
    }
}