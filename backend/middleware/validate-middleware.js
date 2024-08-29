import jwt from "jsonwebtoken"
const validate = (schema) => async (req, res, next) => {
    try {
        console.log(`Resolving Incoming Request 🚥`);
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = 'Fill input details properly'
        const extraDetails = err.errors[0].message
        const error = { status, message, extraDetails }
        console.log('error', error);
        res.status(status).json({ message: message, extraDetails })
        next(error)
    }
}

export { validate }