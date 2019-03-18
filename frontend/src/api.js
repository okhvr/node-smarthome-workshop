import axios from 'axios';

const serverUrl = 'http://localhost:3005';

export async function getGroups() {
    const response = await axios.get(`${serverUrl}/groups`);
    return response.data;
}

export async function getGroupById(groupId) {
    const response = await axios.get(`${serverUrl}/groups/${groupId}`);
    return response.data;
}


export async function addGroup(group) {
    return axios.post(`${serverUrl}/groups`, group);
}

export async function removeGroup(groupId) {
    return axios.delete(`${serverUrl}/groups/${groupId}`);
}

export async function switchOnGroup(groupId) {
    await updateGroup(groupId, {
        state: 'on'
    });
}

export async function switchOffGroup(groupId) {
    await updateGroup(groupId, {
        state: 'off'
    });
}

export async function updateGroup(groupId, data) {
    return axios.put(`${serverUrl}/groups/${groupId}`, data)
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
