function getWeekDates(today) {
    const day = today.getDay()
    const date = today.getDate() - day

    let monday = new Date(today.setDate(date))
    let weekDates = []
    for (let i = 0; i < 7; i++) {
        weekDates.push(new Date(monday.setDate(monday.getDate() + 1)))
    }

    weekDates = weekDates.map(date => date.toISOString().split('T')[0])

    return weekDates
}

function getDayTimes() {
    let time = new Date();
    time.setHours(0, 0);

    let dayTimes = []
    for (let i = 0; i < 48; i++) {
        dayTimes.push(time)
        time = new Date(time.getTime() + 30 * 60000)
    }

    dayTimes = dayTimes.map(time => time.toTimeString().split(' ')[0].slice(0, -3))

    return dayTimes
}

function getCalendarData(timeSlots, weekDates, dayTimes) {
    const calendar1 = new Map();

    for (let i = 0; i < 7; i++) {
        const dayMap = new Map();

        for (let j = 0; j < 48; j++) {
            const res = timeSlots.filter(timeSlot => timeSlot.date === weekDates[i] && timeSlot.time === dayTimes[j]);

            if (res.length > 0) {
                dayMap.set(dayTimes[j], res[0]);
            } else {
                dayMap.set(dayTimes[j], {});
            }
        }

        calendar1.set(weekDates[i], dayMap);
    }

    return calendar1;
}

export { getWeekDates, getDayTimes, getCalendarData }