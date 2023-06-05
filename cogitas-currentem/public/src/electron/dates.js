"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDateGenerator = void 0;
class DefaultDateGenerator {
    getSemana() {
        const date = new Date();
        const year = date.getFullYear();
        // Find the first Monday of the year
        const firstDayOfYear = new Date(year, 0, 1);
        const dayOfWeek = firstDayOfYear.getDay(); // 0 (Sunday) - 6 (Saturday)
        const dayOffset = (dayOfWeek <= 1) ? 1 - dayOfWeek : 8 - dayOfWeek; // Calculate days until next Monday
        const firstMondayOfYear = new Date(year, 0, 1 + dayOffset);
        const timestamp1 = date.getTime();
        const timestamp2 = firstMondayOfYear.getTime();
        const differenceInMilliseconds = timestamp1 - timestamp2;
        // We use 1000 * 60 * 60 * 24 * 7 to convert from milliseconds to weeks
        const differenceInWeeks = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7);
        return Math.floor(differenceInWeeks) + 1;
    }
    getHoy() {
        return Date.now();
    }
}
exports.DefaultDateGenerator = DefaultDateGenerator;
//# sourceMappingURL=dates.js.map