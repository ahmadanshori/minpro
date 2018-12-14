function T_souvenir(t_souvenir_data) {
    this._id = t_souvenir_data._id;
    this.code = t_souvenir_data.code;
    this.type = t_souvenir_data.type;
    this.t_event_id = t_souvenir_data.t_event_id;
    this.first_name_requester = t_souvenir_data.first_name_requester;
    this.last_name_requester = t_souvenir_data.last_name_requester;
    this.request_date = t_souvenir_data.request_date;
    this.request_due_date = t_souvenir_data.request_due_date;
    this.approved_by = t_souvenir_data.approved_by;
    this.approved_date = t_souvenir_data.approved_date;
    this.received_by = t_souvenir_data.received_by;
    this.received_date = t_souvenir_data.received_date;
    this.settlement_by = t_souvenir_data.settlement_by;
    this.settlement_date = t_souvenir_data.settlement_date;
    this.settlement_approved_by = t_souvenir_data.settlement_approved_by;
    this.settlement_approved_date = t_souvenir_data.settlement_approved_date;
    this.status = t_souvenir_data.status;
    this.note = t_souvenir_data.note;
    this.reject_reason = t_souvenir_data.reject_reason;
    this.is_delete = t_souvenir_data.is_delete;
    this.created_by = t_souvenir_data.created_by;
    this.created_date =t_souvenir_data.created_date;
    this.updated_by = t_souvenir_data.update_by;
    this.updated_date = t_souvenir_data.update_date;
  }
  
  T_souvenir.prototype.getData = function() {
    return {
      _id: this._id,
      t_souvenir_id: this.t_souvenir_id,
      type: this.type,
      t_event_id: this.t_event_id,
      first_name_requester: this.first_name_requester,
      last_name_requester: this.last_name_requester,
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
      updated_by: this.update_by,
      updated_date: this.update_date
    };
  };
  
  module.exports = T_souvenir;
  