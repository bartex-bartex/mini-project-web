function addThirtyMinutes(timeStr) {
    let [hours, minutes] = timeStr.split(':').map(Number);
    minutes += 30;
    if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    }
    if (hours >= 24) {
        hours -= 24;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function closestPreviousThirtyMinutes(timeStr) {
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (minutes < 30) {
        minutes = 0;
    } else {
        minutes = 30;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function closestNextThirtyMinutes(timeStr) {
    let [hours, minutes] = timeStr.split(':').map(Number);
    
    if (minutes === 0 || minutes === 30) {
        return timeStr;
    }

    if (minutes < 30) {
        minutes = 30;
    } else {
        minutes = 0;
        hours += 1;
    }
    if (hours >= 24) {
        hours = 0;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

module.exports = {
    addThirtyMinutes,
    closestPreviousThirtyMinutes,
    closestNextThirtyMinutes
};