function T_Event(tEventData) {
  this._id = tEventData._id;
  this.code = tEventData.code;
  this.event_name = tEventData.event_name;
  this.start_date = tEventData.start_date;
  this.end_date = tEventData.end_date;
  this.place = tEventData.place;
  this.budget = tEventData.budget;
  this.request_by = tEventData.request_by;
  this.request_date = tEventData.request_date;
  this.approved_by = tEventData.approved_by;
  this.approved_date = tEventData.approved_date;
  this.assign_to = tEventData.assign_to;
  this.closed_date = tEventData.closed_date;
  this.note = tEventData.note;
  this.status = tEventData.status;
  this.reject_reason = tEventData.reject_reason;
  this.is_delete = tEventData.false;
  this.created_by = tEventData.created_by;
  this.created_date = tEventData.created_date;
  this.updated_by = tEventData.updated_by;
  this.updated_date = tEventData.updated_date;
}

T_Event.prototype.getData = function() {
  return {
    _id: this._id,
    code: this.code,
    event_name: this.event_name,
    start_date: this.start_date,
    end_date: this.end_date,
    place: this.place,
    budget: this.budget,
    request_by: this.request_by,
    request_date: this.request_date,
    approved_by: this.approved_by,
    approved_date: this.approved_date,
    assign_to: this.assign_to,
    closed_date: this.closed_date,
    note: this.note,
    status: this.status,
    reject_reason: this.reject_reason,
    is_delete: this.false,
    created_by: this.created_by,
    created_date: this.created_date,
    updated_by: this.updated_by,
    updated_date: this.updated_date
  };
};

module.exports = T_Event;
