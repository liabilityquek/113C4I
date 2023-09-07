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
                afterValues: true
            }
        });

        if (driverUpdates && driverUpdates.length > 0) {
            const response = driverUpdates.map(update => ({
                updatedAt: update.updatedAt,
                afterValues: JSON.parse(update.afterValues) 
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