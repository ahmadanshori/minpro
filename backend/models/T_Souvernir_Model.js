function T_souvernir(t_souvernir_data) {
    this._id = t_souvernir_data._id;
    this.code = t_souvernir_data.code;
    this.type = t_souvernir_data.type;
    this.t_event_id = t_souvernir_data.t_event_id;
    this.request_by = t_souvernir_data.request_by;
    this.request_date = t_souvernir_data.request_date;
    this.request_due_date = t_souvernir_data.request_due_date;
    this.approved_by = t_souvernir_data.approved_by;
    this.approved_date = t_souvernir_data.approved_date;
    this.received_by = t_souvernir_data.received_by;
    this.received_date = t_souvernir_data.received_date;
    this.settlement_by = t_souvernir_data.settlement_by;
    this.settlement_date = t_souvernir_data.settlement_date;
    this.settlement_approved_by = t_souvernir_data.settlement_approved_by;
    this.settlement_approved_date = t_souvernir_data.settlement_approved_date;
    this.status = t_souvernir_data.status;
    this.note = t_souvernir_data.note;
    this.reject_reason = t_souvernir_data.reject_reason;
    this.is_delete = t_souvernir_data.is_delete;
    this.created_by = t_souvernir_data.created_by;
    this.created_date =t_souvernir_data.created_date;
    this.updated_by = t_souvernir_data.update_by;
    this.updated_date = t_souvernir_data.update_date;
  }
  
  T_souvernir.prototype.getData = function() {
    return {
      _id: this._id,
      code: this.code,
      type: this.type,
      t_event_id: this.t_event_id,
      request_by: this.request_by,
      request_date: this.request_date,
      request_due_date: this.request_due_date,
      received_by: this.received_by,
      received_date: this.received_date,
      approved_by: this.approved_by,
      approved_date: this.approved_date,
      settlement_by: this.settlement_by,
      settlement_date: this.settlement_date,
      settlement_approved_by: this.settlement_approved_by,
      settlement_approved_date: this.settlement_approved_date,
      status: this.status,
      note: this.note,
      reject_reason: this.reject_reason,
      is_delete: this.is_delete,
      created_by: this.created_by,
      created_date: this.created_date,
      update_by: this.update_by,
      update_date: this.update_date
    };
  };
  
  module.exports = T_souvernir;
  