export class RandomHelpers {
    public static generateRadomCode(length = 6) {
        let str = "";
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        while (str.length <= length) {
            const index = Math.floor(Math.random() * chars.length);

            if (index > chars.length)
                continue;

            str += chars[index];
        }

        return str;
    }
}