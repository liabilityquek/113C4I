const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//GET UPDATE HISTORY ON DRIVER'S PROFILE
const getUpdatesHistory = async (req, res) => {
    const { toId } = req.params

    try {

        const driverUpdates = await prisma.UpdateHistory.findMany({
            where: { toId: Number(toId) },
            select: {
                updatedAt: true,
                afterValues: true,
                beforeValues: true,
                updatedByTo: {
                    select: {
                        name: true
                    },
                },
                updatedByUser: {
                    select: {
                        name: true,
                    }
                }
            }
        });


        if (driverUpdates && driverUpdates.length > 0) {
            const response = driverUpdates.map(update => ({
                updatedAt: update.updatedAt,
                beforeValues: JSON.parse(update?.beforeValues),
                afterValues: JSON.parse(update?.afterValues),
                updateByUserName: update?.updatedByUser?.name,
                updateByToName: update?.updatedByTo?.name

            }));
            res.status(200).send(response);
        } else {
            res.status(200).send(`No updates for this driver`);
        }

    } catch (e) {
        return res.status(400).send(`Error getting updates history: ${e}`);
    }
}

module.exports = {
    getUpdatesHistory,
}