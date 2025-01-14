import TableCell from './TableCell'

function TimeRow({ time, weekDates, calendar }) {
  return (
    <tr>
      <td>{time}</td>
      {weekDates.map(date => {
        const timeSlot = calendar.get(date)?.get(time) || {};
        return <TableCell timeSlot={timeSlot} time={time} date={date} />;
      })}
    </tr>
  );
}

export default TimeRow;