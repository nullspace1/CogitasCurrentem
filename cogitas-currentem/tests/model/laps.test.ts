import { Lap } from "../../src/electron/model/lap";

const TestLaps = [{lap:new Lap(30,500),expected:30/500}]

describe.each(TestLaps)(
    'Testing pace calculation',(data) =>
    {it('Pace matches expected',() =>  {expect(data.lap.getPace()).toBe(data.expected)})}
)
