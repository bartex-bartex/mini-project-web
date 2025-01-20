import TableCell from './TableCell'

function TimeRow({ time, weekDates, calendar }) {
  return (
    <tr>
      <td>{time}</td>
      {weekDates.map((date, idx) => {
        const timeSlot = calendar.get(date)?.get(time) || {};
        return <TableCell key={idx} timeSlot={timeSlot} time={time} date={date} />;
      })}
    </tr>
  );
}

export default TimeRow;