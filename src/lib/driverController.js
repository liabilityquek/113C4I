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

//AMEND DRIVER DETAILS
const amendDriver = async (req, res) => {
    const {
        name,
        contact,
        next_of_kin_name,
        next_of_kin_contact,
        rank,
        availability,
        avatar
    } = req.body;

    const { id } = req.params

    try {
        const schema = Yup.object().shape({
            name: Yup.string(),
            contact: Yup.string(),
            next_of_kin_name: Yup.string(),
            next_of_kin_contact: Yup.string(),
            rank: Yup.string(),
            availability: Yup.string(),
        });

        await schema.validate(req.body);

        const editDriver = await prisma.TO.update({
            where: { id: Number(id) },
            data: {
                name,
                contact,
                next_of_kin_name,
                next_of_kin_contact,
                rank,
                availability,
                avatar
            }
        })
        res.status(200).json({ message: "TO successfully amended!", editDriver });

    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            return res.status(400).send(`Validation error: ${e}`);
        } else {
            return res.status(400).send(`Error amending profile: ${e}`);
        }
    }
}

module.exports = {
    createDriver,
    amendDriver
};