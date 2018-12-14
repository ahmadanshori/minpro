function T_Promotion(promotionData) {
  this._id = promotionData._id;
  this.code = promotionData.code;
  this.flag_design = promotionData.flag_design;
  this.title = promotionData.title;
  this.t_event_id = promotionData.t_event_id;
  this.t_design_id = promotionData.t_design_id;
  this.request_by = promotionData.request_by;
  this.request_date = promotionData.request_date;
  this.approved_by = promotionData.approved_by;
  this.approved_date = promotionData.approved_date;
  this.assign_to = promotionData.assign_to;
  this.name_assign = promotionData.name_assign;
  this.close_date = promotionData.close_date;
  this.note = promotionData.note;
  this.status = promotionData.status;
  this.reject_reason = promotionData.reject_reason;
  this.is_delete = promotionData.is_delete;
  this.created_by = promotionData.created_by;
  this.created_date = promotionData.created_date;
  this.updated_by = promotionData.created_by;
  this.updated_date = promotionData.updated_date;
}

T_Promotion.prototype.getData = function() {
  return {
    _id: this._id,
    code: this.code,
    flag_design: this.flag_design,
    title: this.title,
    t_event_id: this.t_event_id,
    t_design_id: this.t_design_id,
    request_by: this.request_by,
    request_date: this.request_date,
    approved_by: this.approved_by,
    approved_date: this.approved_date,
    assign_to: this.assign_to,
    name_assign: this.name_assign,
    close_date: this.close_date,
    note: this.note,
    status: this.status,
    reject_reason: this.reject_reason,
    is_delete: this.is_delete,
    created_by: this.created_by,
    created_date: today,
    updated_by: this.created_by,
    updated_date: this.updated_date
  };
};

module.exports = T_Promotion;
