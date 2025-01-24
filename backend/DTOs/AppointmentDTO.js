class AppointmentDTO {
  constructor({ id, doctorNotes, patientAge, patientGender, patientName, visitType, slots, scheduleId, patientId, date, time }) {
    this.id = id;
    this.doctorNotes = doctorNotes;
    this.patientAge = patientAge;
    this.patientGender = patientGender;
    this.patientName = patientName;
    this.visitType = visitType;
    this.slots = slots,
    this.scheduleId = scheduleId,
    this.patientId = patientId,
    this.date = date,
    this.time = time
  }


  static fromRequestBody(body) {
    return new AppointmentDTO({
      id: body.id,
      doctorNotes: body.doctorNotes,
      patientAge: body.patientAge,
      patientGender: body.patientGender,
      patientName: body.patientName,
      visitType: body.visitType,
      slots: body.slots,
      scheduleId: body.scheduleId,
      patientId: body.patientId,
      date: body.date,
      time: body.time,
    });
  }
}

module.exports = AppointmentDTO;