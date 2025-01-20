import { addThirtyMinutes, closestPreviousThirtyMinutes, closestNextThirtyMinutes } from '../dateHelper';

test('addThirtyMinutes adds 30 minutes correctly', () => {
    expect(addThirtyMinutes('09:00')).toBe('09:30');
    expect(addThirtyMinutes('09:45')).toBe('10:15');
    expect(addThirtyMinutes('23:45')).toBe('00:15');
    expect(addThirtyMinutes('23:30')).toBe('00:00');
    expect(addThirtyMinutes('00:00')).toBe('00:30');
    expect(addThirtyMinutes('12:30')).toBe('13:00');
    expect(addThirtyMinutes('11:59')).toBe('12:29');
    expect(addThirtyMinutes('22:30')).toBe('23:00');
    expect(addThirtyMinutes('05:15')).toBe('05:45');
    expect(addThirtyMinutes('14:45')).toBe('15:15');
    expect(addThirtyMinutes('18:00')).toBe('18:30');
    expect(addThirtyMinutes('07:30')).toBe('08:00');
    expect(addThirtyMinutes('16:45')).toBe('17:15');
    expect(addThirtyMinutes('21:30')).toBe('22:00');
});

test('closestPreviousThirtyMinutes returns closest previous 30-minute interval', () => {
    expect(closestPreviousThirtyMinutes('09:15')).toBe('09:00');
    expect(closestPreviousThirtyMinutes('09:45')).toBe('09:30');
    expect(closestPreviousThirtyMinutes('00:15')).toBe('00:00');
    expect(closestPreviousThirtyMinutes('00:45')).toBe('00:30');
    expect(closestPreviousThirtyMinutes('12:10')).toBe('12:00');
    expect(closestPreviousThirtyMinutes('12:50')).toBe('12:30');
    expect(closestPreviousThirtyMinutes('23:59')).toBe('23:30');
    expect(closestPreviousThirtyMinutes('11:29')).toBe('11:00');
    expect(closestPreviousThirtyMinutes('14:31')).toBe('14:30');
    expect(closestPreviousThirtyMinutes('18:29')).toBe('18:00');
    expect(closestPreviousThirtyMinutes('05:30')).toBe('05:30');
    expect(closestPreviousThirtyMinutes('07:00')).toBe('07:00');
    expect(closestPreviousThirtyMinutes('16:15')).toBe('16:00');
    expect(closestPreviousThirtyMinutes('21:45')).toBe('21:30');
});

test('closestNextThirtyMinutes returns closest next 30-minute interval', () => {
    expect(closestNextThirtyMinutes('09:15')).toBe('09:30');
    expect(closestNextThirtyMinutes('09:45')).toBe('10:00');
    expect(closestNextThirtyMinutes('23:45')).toBe('00:00');
    expect(closestNextThirtyMinutes('23:15')).toBe('23:30');
    expect(closestNextThirtyMinutes('00:01')).toBe('00:30');
    expect(closestNextThirtyMinutes('12:10')).toBe('12:30');
    expect(closestNextThirtyMinutes('12:50')).toBe('13:00');
    expect(closestNextThirtyMinutes('11:29')).toBe('11:30');
    expect(closestNextThirtyMinutes('14:31')).toBe('15:00');
    expect(closestNextThirtyMinutes('18:29')).toBe('18:30');
    expect(closestNextThirtyMinutes('05:30')).toBe('05:30');
    expect(closestNextThirtyMinutes('07:00')).toBe('07:00');
    expect(closestNextThirtyMinutes('16:15')).toBe('16:30');
    expect(closestNextThirtyMinutes('21:45')).toBe('22:00');
});