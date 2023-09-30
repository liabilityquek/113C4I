const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Yup = require("yup");

//CREATE DRIVER PROFILE
const createDriver = async (req, res) => {
    const {
        name,
        contact,
        next_of_kin_name,
        next_of_kin_contact,
        rank,
        TOs,
        availability,
        avatar,
        relationship
    } = req.body;

    try {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            contact: Yup.string().length(8, 'Contact no must be 8 characters long').required(),
            next_of_kin_name: Yup.string().required(),
            next_of_kin_contact: Yup.string().length(8, 'Contact no must be 8 characters long').required(),
            rank: Yup.string().required(),
            availability: Yup.string().required(),
            relationship: Yup.string().required(),
        });

        await schema.validate(req.body);
        const createData = {
            name,
            contact,
            next_of_kin_name,
            next_of_kin_contact,
            rank,
            availability,
            avatar,
            relationship
        };

        if (TOs && TOs.length) {
            createData.TOs = {
                connect: TOs.map(id => ({ id }))
            };
        }

        const createDriverProfile = await prisma.TO.create({
            data: createData
        });

        res.status(200).send(`Driver profile successfully created!, ${createDriverProfile}`);
    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            console.log("Yup Error:", e.errors);
            return res.status(400).send(`Yup validation error: ${e}`);
        } else {
            console.log("Other Error:", e.message);
            return res.status(400).send(`Error: ${e}`);
        }
    }
}

//AMEND DRIVER DETAILS AND APPEND CHANGES TO UPDATE HISTORY, IF AVAILABILITY CHANGES TO DEFERRED, REMOVE VEHICLE TAGGING
const amendDriver = async (req, res) => {
    const {
        name,
        contact,
        next_of_kin_name,
        next_of_kin_contact,
        rank,
        availability,
        avatar,
        relationship
    } = req.body;

    const { id, userId } = req.params

    const getUserId = await prisma.User.findUnique({
        where: { id: Number(userId) }
    })

    if (!getUserId) {
        return res.status(501).send("Error, Invalid User")
    }

    const driverId = await prisma.TO.findUnique({
        where: { id: Number(id) }
    })

    if (!driverId) {
        return res.status(501).send("Error, Driver profile not found")
    }

    try {
        const schema = Yup.object().shape({
            name: Yup.string(),
            contact: Yup.string().length(8, 'Contact no must be 8 characters long'),
            next_of_kin_name: Yup.string(),
            next_of_kin_contact: Yup.string().length(8, 'Contact no must be 8 characters long'),
            rank: Yup.string(),
            availability: Yup.string(),
            relationship: Yup.string(),
        });

        await schema.validate(req.body);

        // Capture old values
        const oldValues = {
            name: driverId.name,
            contact: driverId.contact,
            next_of_kin_name: driverId.next_of_kin_name,
            next_of_kin_contact: driverId.next_of_kin_contact,
            rank: driverId.rank,
            availability: driverId.availability,
            avatar: driverId.avatar,
            relationship: driverId.relationship
        };

        const editDriver = await prisma.TO.update({
            where: { id: Number(id) },
            data: {
                name,
                contact,
                next_of_kin_name,
                next_of_kin_contact,
                rank,
                availability,
                avatar,
                relationship
            }
        })

        // Capture new values
        const newValues = {
            name: editDriver.name,
            contact: editDriver.contact,
            next_of_kin_name: editDriver.next_of_kin_name,
            next_of_kin_contact: editDriver.next_of_kin_contact,
            rank: editDriver.rank,
            availability: editDriver.availability,
            avatar: editDriver.avatar,
            relationship: editDriver.relationship
        };

        //Identify which fields have been changed
        const changedFields = Object.keys(newValues).filter(key => {
            if (Array.isArray(newValues[key]) && Array.isArray(oldValues[key]) && newValues[key].length === 0 && oldValues[key].length === 0) {
                    return false;
            }
            return newValues[key] !== oldValues[key];
        })

        // Proceed if there are changed fields
        if (changedFields.length > 0) {
            const beforeValues = {}
            const afterValues = {}

            // Get before and after values for changed fields
            changedFields.forEach(field => {
                beforeValues[field] = oldValues[field]
                afterValues[field] = newValues[field]
            })

            await prisma.updateHistory.create({
                data: {
                    updatedByUserId: Number(userId),
                    toId: Number(id),
                    fields: JSON.stringify(changedFields),
                    beforeValues: JSON.stringify(beforeValues),
                    afterValues: JSON.stringify(afterValues),
                    updatedAt: new Date(),
                }
            })

            res.status(200).send({ message: "TO successfully amended!", editDriver });

            if (editDriver.availability === 'DEFERRED') {
                await prisma.vehicle.updateMany({
                    where: { toId: Number(id) },
                    data: { toId: null }
                })
            }
        }

    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            return res.status(400).send(`Validation error: ${e}`);
        } else {
            return res.status(400).send(`Error amending profile: ${e}`);
        }
    }
}


//DELETE DRIVER PROFILE AND DELTE UPDATE HISTORY, IF VEHICLE WAS PREVIOUSLY TAGGED TO THE DRIVER, THEN VEHICLE TAGGING WILL BE REMOVED AS WELL

const deleteDriver = async (req, res) => {
    const { id } = req.params

    const driverId = await prisma.TO.findUnique({
        where: { id: Number(id) }
    })

    if (!driverId) {
        return res.status(501).send("Error, Driver profile not found")
    }

    try {

        await prisma.UpdateHistory.deleteMany({
            where: { toId: Number(id) }
        })

        await prisma.Vehicle.updateMany({
            where: { toId: Number(id) },
            data: { toId: null }
        })
        const removeDriverProfile = await prisma.TO.delete({
            where: { id: Number(id) }
        })
        res.status(200).send({ message: 'Driver profile successfully deleted!', removeDriverProfile })


    } catch (e) {
        return res.status(503).send(`Removing driver profile unsuccessfully: ${e}`);
    }
}

module.exports = {
    createDriver,
    amendDriver,
    deleteDriver
};