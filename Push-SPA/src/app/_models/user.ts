import { Reminder } from './reminder';

export interface User {
    id: number;
    username: string;
    reminders?: Reminder[];
}
