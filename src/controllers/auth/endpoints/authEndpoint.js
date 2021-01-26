
import { AuthError } from '../../../errors';
import { authFactory } from '../../../services'

const authUser = (jwtSecret) => async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "invalid payload" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "invalid payload" });
    }

    try {
        const auth = authFactory(jwtSecret);
        const token = await auth(username, password);

        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(401).json({ error: error.message });
        }

        next(error);
    }
}

export default authUser;