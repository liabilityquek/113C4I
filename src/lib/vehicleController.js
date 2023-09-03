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
            veh_no: Yup.string().required(),
            veh_type: Yup.string().required(),
        });

        await schema.validate(req.body);

        const createNewVehicle = await prisma.Vehicle.create({
            data: {
                veh_no,
                veh_type
            }
        });

        res.status(200).json({ message: "Vehicle successfully created!", vehicle: createNewVehicle });

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

    try {
        const schema = Yup.object().shape({
            veh_no: Yup.string().required(),
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
        res.status(200).json({ message: "Vehicle successfully amended!", editVehicle });

    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            return res.status(400).send(`Validation error: ${e}`);
        } else {
            return res.status(400).send(`Error amending vehicle: ${e}`);
        }
    }
}

//TAGGING DRIVER TO THE RESPECTIVE VEHICLE
const tagVehicle = async (req, res) => {
    const {
        toId
    } = req.body;

    const { vehicleId } = req.params

    try {
        const schema = Yup.object().shape({
            toId: Yup.number().integer().positive()
        });

        await schema.validate(req.body);

        const tagDriverToVehicle = await prisma.Vehicle.update({
            where: { id: Number(vehicleId) },
            data: {
                toId: Number(toId)
            }
        })
        res.status(200).json({ message: `Vehicle ID ${vehicleId} successfully tagged!`, tagDriverToVehicle });

    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            return res.status(400).send(`Validation error: ${e}`);
        } else {
            return res.status(400).send(`Error tagging driver to vehicle: ${e}`);
        }
    }
}

// await prisma.Vehicle.update({
//     where: { id: vehicleId },
//     data: { toId: toId }
//   });

module.exports = {
    createVehicle,
    amendVehicle,
    tagVehicle
};