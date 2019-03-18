const http = require('http');
const router = require('express').Router();
const Device = require('../models/device');

const ACTIONS = {
    created: 'device created',
    deleted: 'device deleted',
    updated: 'device updated',

};

function Log(action) {
    this.action = action;
    this.date = new Date();
};

function sendRequest(url) {
    return new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(res.statusCode)
            } else {
                resolve();
            }
        });

        req.on('error', ()=>{
            reject('device not found');
        })
    });
}

function deviceAdapter(device) {
    return {
        id: device._id,
        name: device.name,
        address: device.address,
        port: device.port,
        state: device.state ? 'on' : 'off'
    }
}

router.get('/', async (req, res) => {
    const devices = await Device.find().exec();
    res.json(devices.map(deviceAdapter));
});

router.get('/:id', async (req, res) => {
    const deviceId = req.params.id;
    const device = await Device.findById(deviceId).exec();

    if (device) {
        res.json(deviceAdapter(device));
    } else {
        res.sendStatus(404);
    }
});

router.post('/', async (req, res) => {
    const log = new Log(ACTIONS.created);
    const deviceData = {
        ...req.body,
        logs: log
    };
    const device = new Device(deviceData);

    await device.save();
    res.sendStatus(201);
})

router.delete('/:id', async (req, res) => {
    const deviceId = req.params.id;
    await Device.findByIdAndRemove(deviceId).exec();

    res.sendStatus(200);
});

router.put('/:id', async (req, res) => {
    const deviceId = req.params.id;
    const deviceData = req.body;

    try {
        const device = await Device.findById(deviceId).exec();
        const log = new Log(ACTIONS.updated);
        await device.update({
            ...deviceData,
            state: deviceData.state === 'on',
            logs: [...device.logs, log]
        });

        const url = `http://${device.address}:${device.port}`;
        const command = device.state ? 'Power off' : 'Power On';
            try {
                await sendRequest(`${url}/cm?cmnd=${command}`);
            } catch (e) {
                console.log('Smth went wrong', e);
            }
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
});

router.get('/logs/:id', async (req, res) => {
    const deviceId = req.params.id;
    const device = await Device.findById(deviceId).exec();

    if (device) {
        res.json({logs: device.logs});
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;