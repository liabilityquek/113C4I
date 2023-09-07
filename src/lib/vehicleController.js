const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Yup = require("yup");

//CREATE A NEW VEHICLE
const createVehicle = async (req, res) => {
    const {
        veh_no,
        veh_type,
    } = req.body;

    try {

        const schema = Yup.object().shape({
            veh_no: Yup.string().length(5, 'Vehicle number must be exactly 5 characters long').required(),
            veh_type: Yup.string().required(),
        });

        await schema.validate(req.body);

        const createNewVehicle = await prisma.Vehicle.create({
            data: {
                veh_no,
                veh_type
            }
        });

        res.status(200).send({ message: "Vehicle successfully created!", vehicle: createNewVehicle });

    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            return res.status(400).send(`Validation error: ${e}`);
        } else {
            return res.status(400).send(`Error inserting a new vehicle: ${e}`);
        }
    }
}

//AMEND VEHICLE
const amendVehicle = async (req, res) => {
    const {
        veh_no,
        veh_type,
    } = req.body;

    const { vehicleId } = req.params

    const getVehicleId = await prisma.Vehicle.findUnique({
        where: { id: Number(vehicleId) }
    })

    if (!getVehicleId) {
        return res.status(501).send("Error, Vehicle not found")
    }

    try {
        const schema = Yup.object().shape({
            veh_no: Yup.string().length(5, 'Vehicle number must be exactly 5 characters long').required(),
            veh_type: Yup.string().required(),
        });

        await schema.validate(req.body);

        const editVehicle = await prisma.Vehicle.update({
            where: { id: Number(vehicleId) },
            data: {
                veh_no,
                veh_type,
            }
        })
        res.status(200).send({ message: "Vehicle successfully amended!", editVehicle });

    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            return res.status(400).send(`Validation error: ${e}`);
        } else {
            return res.status(400).send(`Error amending vehicle: ${e}`);
        }
    }
}

//TAGGING DRIVER TO THE RESPECTIVE VEHICLE IF DRIVER IS PRESENT
const tagVehicle = async (req, res) => {
    const {
        toId
    } = req.body;

    const { vehicleId } = req.params

    const getVehicleId = await prisma.Vehicle.findUnique({
        where: { id: Number(vehicleId) }
    })

    if (!getVehicleId) {
        return res.status(501).send("Error, Vehicle not found")
    }

    try {
        const schema = Yup.object().shape({
            toId: Yup.number().integer().positive()
        });

        await schema.validate(req.body);

        const to = await prisma.tO.findUnique({
            where: { id: Number(toId) }
        })

        if (!to) {
            return res.status(400).send(`TO not found`);
        } else if (to.availability === 'DEFERRED') {
            return res.status(400).send(`This driver is not present, unable to tag to a vehicle`);
        }

        const tagDriverToVehicle = await prisma.Vehicle.update({
            where: { id: Number(vehicleId) },
            data: {
                toId: Number(toId)
            }
        })
        res.status(200).send({ message: `Vehicle ID ${vehicleId} successfully tagged!`, tagDriverToVehicle });

    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            return res.status(400).send(`Validation error: ${e}`);
        } else {
            return res.status(400).send(`Error tagging driver to vehicle: ${e}`);
        }
    }
}

//DELETE VEHICLE, IF VEHICLE WAS PREVIOUSLY TAGGED TO THE DRIVER, THEN VEHICLE TAGGING WILL BE REMOVED AS WELL
const deleteVehicle = async (req, res) => {
    const { vehicleId } = req.params

    const getVehicleId = await prisma.Vehicle.findUnique({
        where: { id: Number(vehicleId) }
    })

    if (!getVehicleId) {
        return res.status(501).send("Error, Vehicle not found")
    }

    try {

        const removeVehicle = await prisma.Vehicle.delete({
            where: { id: Number(vehicleId) }
        })
        res.status(200).send({ message: 'Vehicle successfully deleted!', removeVehicle})


    } catch (e) {
        return res.status(503).send(`Removing vehicle unsuccessfully: ${e}`);
    }
}

module.exports = {
    createVehicle,
    amendVehicle,
    tagVehicle,
    deleteVehicle
};