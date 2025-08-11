export class DateTimeHelper {


    public static isDeadlineExpired(dateTime: Date, minutsToExpire = 1): boolean {
        const deadline = new Date(dateTime.getTime() + (minutsToExpire * 60 * 1000));
        const now = new Date();
        return now >= deadline;
    }

    public static getSecondsUntilFromTimestamp(futureTimestamp: number): number {
        const nowTimestamp = Date.now(); // também é um getTime()
        const diffMs = futureTimestamp - nowTimestamp;
        return Math.floor(diffMs / 1000); // converte para segundos
    }
}