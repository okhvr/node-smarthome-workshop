const http = require('http');
const router = require('express').Router();
const Group = require('../models/group');
const Device = require('../models/device');

const ACTIONS = {
    updated: 'device status updated in group',

};

function Log(action) {
    this.action = action;
    this.date = new Date();
};

function groupAdapter(group) {
    return {
        id: group._id,
        name: group.name,
        state: group.state ? 'on' : 'off',
        devices: group.devices
    }
}

router.get('/', async (req, res) => {
    const groups = await Group.find().exec();
    res.json(groups.map(groupAdapter));
});

router.get('/:id', async (req, res) => {
    const groupId = req.params.id;
    const group = await Group.findById(groupId).exec();

    if (group) {
        res.json(groupAdapter(group));
    } else {
        res.sendStatus(404);
    }
});

router.post('/', async (req, res) => {
    const groupData = {
        ...req.body
    };
    const group = new Group(groupData);

    await group.save();
    res.sendStatus(201);
})

router.delete('/:id', async (req, res) => {
    const groupId = req.params.id;
    await Group.findByIdAndRemove(groupId).exec();

    res.sendStatus(200);
});

router.put('/:id', async (req, res) => {
    const groupId = req.params.id;
    const groupData = req.body;

    try {
        const group = await Group.findById(groupId).exec();     
        const log = new Log(`${ACTIONS.updated} ${group.name}`);
        const isStateChanged = group.state !== groupData.state;
        if (isStateChanged) {
            await Device.update(
                {
                    _id: {
                        $in: group.devices
                    }
                },
                {
                    $set: {
                        state: groupData.state === 'on'
                    },
                    $push: {
                        logs: log
                    }
                },
                {multi: true}
             );
        }
        await group.update({
            ...groupData,
            state: groupData.state === 'on',
        });
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
});

module.exports = router;