function M_Souvenir(mSouvenirData) {
  this._id = mSouvenirData._id;
  this.code = mSouvenirData.code;
  this.name = mSouvenirData.name;
  this.description = mSouvenirData.description;
  this.m_unit_id = mSouvenirData.m_unit_id;
  this.is_delete = mSouvenirData.is_delete;
  this.created_by = mSouvenirData.created_by;
  this.created_date = mSouvenirData.created_date;
  this.updated_by = mSouvenirData.updated_by;
  this.updated_date = mSouvenirData.updated_date;
}

M_Souvenir.prototype.getData = function() {
  return {
    _id: this._id,
    code: this.code,
    name: this.name,
    description: this.description,
    m_unit_id: this.m_unit_id,
    is_delete: this.is_delete,
    created_by: this.created_by,
    created_date: this.created_date,
    updated_by: this.updated_by,
    updated_date: this.updated_date
  };
};

module.exports = M_Souvenir;
