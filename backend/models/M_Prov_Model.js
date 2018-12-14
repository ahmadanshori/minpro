function M_prov(m_prov_data){
    this._id=m_prov_data._id
    this.kode_provinsi=m_prov_data.kode_provinsi
    this.nama_provinsi=m_prov_data.nama_provinsi
    this.created_by=m_prov_data.created_by
    this.created_date=m_prov_data.created_date
    this.updated_by=m_prov_data.updated_by
    this.updated_date=m_prov_data.updated_date
}

M_prov.prototype.getData = function(){
    return {
        _id : this._id,
        kode_provinsi : this.kode_provinsi,
        nama_provinsi : this.nama_provinsi,
        created_by : this.created_by,
        created_date : this.created_date,
        updated_by : this.updated_by,
        updated_date : this.updated_date
    }
}

module.exports = M_prov