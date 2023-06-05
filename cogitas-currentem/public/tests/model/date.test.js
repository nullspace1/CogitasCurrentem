"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dates_1 = require("../../src/electron/dates");
beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 0, 2));
});
afterAll(() => {
    jest.useRealTimers();
});
describe('DefaultDateGenerator', () => {
    let defaultDateGenerator;
    beforeEach(() => {
        defaultDateGenerator = new dates_1.DefaultDateGenerator();
    });
    describe('getSemana', () => {
        it('should return the week of the year', () => {
            const week = defaultDateGenerator.getSemana();
            expect(week).toBe(1);
        });
    });
    describe('getHoy', () => {
        it('should return the current timestamp', () => {
            const mockTimestamp = 1672612800000; // 2023-01-01 00:00:00 UTC
            global.Date.now = jest.fn(() => mockTimestamp);
            const timestamp = defaultDateGenerator.getHoy();
            expect(timestamp).toBe(mockTimestamp);
        });
    });
});
//# sourceMappingURL=date.test.js.map