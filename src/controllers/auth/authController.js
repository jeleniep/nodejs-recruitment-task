
import { Router, Request, Response, NextFunction } from 'express';
import {
    authUser
} from './endpoints';
import { authFactory } from '../../services/authService';
import { User } from '../../models';


class AuthController {
    constructor(jwtSecret) {
        this.router = Router()
        this.path = '/auth';
        this.initializeRoutes(jwtSecret);
        this.addUsers();
    }

    initializeRoutes = (jwtSecret) => {
        const router = Router();
        router
            .post('/', authUser(jwtSecret))


        this.router.use(
            this.path,
            router
        );
    }

    addUsers = async () => {
        const users = [
            {
                id: 123,
                role: "basic",
                name: "Basic Thomas",
                username: "basic-thomas",
                password: "sR-_pcoow-27-6PAwCD8",
            },
            {
                id: 434,
                role: "premium",
                name: "Premium Jim",
                username: "premium-jim",
                password: "GBLtTyq3E_UNjFnpo9m6",
            },
        ];
        for (const user of users) {
            await User.findOneAndUpdate(
                { username: user.username },
                {
                    $set: {
                        id: user.id,
                        role: user.role,
                        name: user.name,
                        username: user.username,
                        password: user.password
                    }
                },
                { upsert: true, new: true }
            );
        }
    }



}

export default AuthController;
