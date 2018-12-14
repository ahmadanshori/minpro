function T_Design(designData) {
  this._id = designData._id;
  this.code = designData.code;
  this.t_event_id = designData.t_event_id;
  this.title_header = designData.title_header;
  this.request_by = designData.request_by;
  this.request_date = designData.request_date;
  this.approved_by = designData.approved_by;
  this.approved_date = designData.approved_date;
  this.assign_to = designData.assign_to;
  this.closed_date = designData.closed_date;
  this.note = designData.note;
  this.status = designData.status;
  this.reject_reason = designData.reject_reason;
  this.is_delete = designData.is_delete;
  this.created_by = designData.created_by;
  this.created_date = designData.created_date;
  this.updated_by = designData.updated_by;
  this.updated_date = designData.updated_date;
}

T_Design.prototype.getData = function() {
  return {
    _id: this._id,
    code: this.code,
    t_event_id: this.t_event_id,
    title_header: this.title_header,
    request_by: this.request_by,
    request_date: this.request_date,
    approved_by: this.approved_by,
    approved_date: this.approved_date,
    assign_to: this.assign_to,
    closed_date: this.closed_date,
    note: this.note,
    status: this.status,
    reject_reason: this.reject_reason,
    is_delete: this.is_delete,
    created_by: this.created_by,
    created_date: this.created_date,
    updated_by: this.updated_by,
    updated_date: this.updated_date
  };
};

module.exports = T_Design;
