let index = 3;

let devices = {
    device1: {
        id: 'device1',
        name: 'Device #1',
        address: '192.168.1.50',
        port: 90,
        state: 'on'
    },
    device2: {
        id: 'device2',
        name: 'Device #2',
        address: '192.168.1.60',
        port: 80,
        state: 'off'
    }
};

function getAllDevices() {
    return Object.values(devices);
}

function getDeviceById(deviceId) {
    return devices[deviceId];
}

function addDevice(device) {
    index += 1;
    devices['device' + index] = {
        id: 'device' + index,
        state: 'off',
        ...device
    };
}

function deleteDevice(id) {
    devices = {
        ...devices,
        [id]: undefined
    };

    delete devices[id];
}

function updateDevice(deviceId, data) {
    devices = {
        ...devices,
        [deviceId]: {
            ...devices[deviceId],
            ...data
        }
    };
}


module.exports = {
    getAllDevices,
    getDeviceById,
    addDevice,
    deleteDevice,
    updateDevice
}
