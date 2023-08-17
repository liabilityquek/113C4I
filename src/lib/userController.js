const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;
const Yup = require("yup");
const sendEmail = require("./sendgrid");

const createUser = async (req, res) => {
    const { email, password, name, role } = req.body;
    console.log(`check body: ${send.stringify(req.body, null, 2)}`)
    try {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email("Please enter a valid email address")
                .required(),
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    "Password must contain: 1 uppercase, 1 lowercase, 1 number, and 1 special character"
                )
                .required(),
            name: Yup.string().required("This field is required"),
            // role: Yup.string().oneOf(['Admin', 'Viewer']).required("This field is required")

        });
        await schema.validate(req.body);
        const existingUser = await prisma.User.findUnique({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return res.status(400).send("This account already exist");
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await prisma.User.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        return res.status(201).send(`User successfully created: ${newUser}`);

    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            const ValidationErrors = {};
            e.inner.forEach((error) => {
                ValidationErrors[error.path] = error.message;
                });
            return res.status(400).send(`Yup validation error: ${e}`);
        }
        console.log("error: ", e);
        res.status(500).send(`Error creating a new user: ${e}`);
    }
};

const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email("Please enter a valid email address")
                .required(),
            password: Yup.string().matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "Password must contain: 1 uppercase, 1 lowercase, 1 number, and 1 special character"
            )
                .required("Password is required"),
        });

        await schema.validate(req.body);

        const findExistingUser = await prisma.User.findUnique({
            where: { email },
        });

        if (!findExistingUser) {
            return res.status(400).send("User not found");
        }

        const checkMatch = await bcrypt.compare(
            password,
            findExistingUser.password
        );
        if (!checkMatch) {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hash = await bcrypt.hash(password, salt);
            findExistingUser.password = hash;
            await prisma.User.update({
                where: { email },
                data: { password: hash },
            });
            await sendEmail({
                email: findExistingUser.email,
                subject: 'Reset Password - 113C4I',
                templateName: 'reset-password'
    
            })
            res.status(200).send("Password successfully changed");
        } else {
            res.status(400).send("New password cannot be the same as the old password");
        }
    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            const ValidationErrors = {};
            e.inner.forEach((error) => {
                ValidationErrors[error.path] = error.message;
                });
            // If the error is a Yup error, return a 400 status with the validation error message
            return res.status(400).send(`Yup validation error: ${e}`);
        }
        console.log("error: ", e);
        res.status(500).send("Error resetting password");
    }
};

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization?.replace(/"/g, "").split(" ")[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            // Assuming the user's email is in the JWT token
            const user = await prisma.User.findUnique({ where: { email: decoded.email } });

            if (user) {
                req.user = user; // Attach user to the request object
                next(); // Continue to the next middleware
            } else {
                res.status(403).send("Forbidden"); // If user not found, respond with 403
            }
        } catch (error) {
            res.status(401).send("Invalid token"); // If token verification fails
        }
    } else {
        res.status(401).send("Unauthorized"); // If no token provided
    }
}


module.exports = {
    resetPassword,
    isAuth,
    createUser,
};