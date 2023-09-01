const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Yup = require("yup");

const createDriver = async (req, res) => {
    const {
        name,
        contact,
        next_of_kin_name,
        next_of_kin_contact,
        rank,
        vehicles,
        availability,
        avatar
    } = req.body;

    try {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            contact: Yup.string().required(),
            next_of_kin_name: Yup.string().required(),
            next_of_kin_contact: Yup.string().required(),
            rank: Yup.string().required(),
            availability: Yup.string().required(),
        });

        await schema.validate(req.body);
        const createData = {
            name,
            contact,
            next_of_kin_name,
            next_of_kin_contact,
            rank,
            availability,
            avatar
        };

        if (vehicles && vehicles.length) {
            createData.vehicles = {
                connect: vehicles.map(id => ({ id }))
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


module.exports = {
    createDriver,

};