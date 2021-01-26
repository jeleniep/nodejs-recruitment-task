import { User } from '../../models';
import { CronJob } from 'cron'

export const initializeUpdateUserCreditsCronJob = () => {
    const job = new CronJob('0 0 1 * *', updateUsersCredits);
    job.start();
};

const updateUsersCredits = async () => {
    const users = await User.find({ role: "basic" }) 
    for (const user of users) {
        user.credits = 5;
        await user.save();
    }
}