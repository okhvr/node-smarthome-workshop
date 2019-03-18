import axios from 'axios';

const serverUrl = 'http://localhost:3005';

let index = 2;
let groups = {
    group1: {
        id: 1,
        name: 'Group 1',
        devices: []
    },
    group2: {
        id: 2,
        name: 'Group 2',
        devices: []
    },
};

export async function getGroups() {
    return Object.values(groups);
}

export async function getGroupById(groupId) {
    return groups.group1;
}


export async function addGroup(group) {
    index += 1;	    
    groups[index] = {	
        id: index,	
        ...group
    };
}

export async function removeGroup(groupId) {
    console.log('removed)');
}

export async function switchOnGroup(groupId) {
    console.log('ONNN');
}

export async function switchOffGroup(groupId) {
    console.log('Offfff');
}

export async function updateGroup(groupId, data) {
    console.log('updated');
}

export async function getDevices() {
    const response = await axios.get(`${serverUrl}/devices`);
    return response.data;
}

export async function getDeviceById(deviceId) {
    const response = await axios.get(`${serverUrl}/devices/${deviceId}`);
    return response.data;
}

export async function addDevice(device) {
    return axios.post(`${serverUrl}/devices`, device);
}

export async function removeDevice(deviceId) {
    return axios.delete(`${serverUrl}/devices/${deviceId}`);
}

export async function updateDevice(deviceId, data) {
    return axios.put(`${serverUrl}/devices/${deviceId}`, data)
}

export async function switchOn(deviceId) {
    await updateDevice(deviceId, {
        state: 'on'
    });
}

export async function switchOff(deviceId) {
    await updateDevice(deviceId, {
        state: 'off'
    });
};

export async function getDeviceLog(deviceId) {
    const response = await axios.get(`${serverUrl}/devices/logs/${deviceId}`);
    return response.data.logs;
}
