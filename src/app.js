import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { initializeDb } from "./initializers";
import {initializeUpdateUserCreditsCronJob} from "./utils/cronJobs"

import {
    PORT, MONGODB_URI
} from './config';



class App {
    constructor(controllers) {
        this.app = express();
        initializeDb(MONGODB_URI);
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        initializeUpdateUserCreditsCronJob();
    }


    listen() {
        this.app.listen(PORT, () => {
            console.log('Server is up and running:');
            console.log(`  PORT: ${PORT}`);
        });
    }

    initializeMiddlewares() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    }

    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
}

export default App;
