const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Yup = require("yup");

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
            console.log("Yup Error:", e.errors);
            return res.status(400).send(`Yup validation error: ${e}`);
        } else {
            console.log("Other Error:", e.message);
            return res.status(400).send(`Error: ${e}`);
        }
    }
}


module.exports = {
    createVehicle,

};