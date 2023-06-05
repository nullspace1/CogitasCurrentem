"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lap_1 = require("../../src/electron/model/lap");
const TestLaps = [{ lap: new lap_1.Lap(30, 500), expected: 30 / 500 }];
describe.each(TestLaps)('Testing pace calculation', (data) => { it('Pace matches expected', () => { expect(data.lap.getPace()).toBe(data.expected); }); });
//# sourceMappingURL=laps.test.js.map