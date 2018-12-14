function M_company(m_comp_data){
    this._id=m_comp_data._id
    this.code=m_comp_data.code
    this.name=m_comp_data.name
    this.address=m_comp_data.address
    // this.province=m_comp_data.province
    // this.city=m_comp_data.city
    this.phone=m_comp_data.phone
    this.email=m_comp_data.email
    this.is_delete=m_comp_data.is_delete
    this.created_by=m_comp_data.created_by
    this.created_date=m_comp_data.created_date
    this.updated_by=m_comp_data.updated_by
    this.updated_date=m_comp_data.updated_date
}

M_company.prototype.getData = function(){
    return {
        _id : this._id,
        code : this.code,
        name : this.name,
        address : this.address,
        // province : this.province,
        // city : this.city,
        phone : this.phone,
        email : this.email,
        is_delete : this.is_delete,
        created_by : this.created_by,
        created_date : this.created_date,
        updated_by : this.updated_by,
        updated_date : this.updated_date
    }
}

module.exports = M_company