function M_kota(m_kota_data){
    this._id=m_kota_data._id
    this.kode_kota=m_kota_data.kode_kota
    this.nama_kota=m_kota_data.nama_kota
    this.kode_provinsi=m_kota_data.kode_provinsi
    this.created_by=m_kota_data.created_by
    this.created_date=m_kota_data.created_date
    this.updated_by=m_kota_data.updated_by
    this.updated_date=m_kota_data.updated_date
}

M_kota.prototype.getData = function(){
    return {
        _id : this._id,
        kode_kota : this.kode_kota,
        nama_kota : this.nama_kota,
        kode_provinsi : this.kode_provinsi,
        created_by : this.created_by,
        created_date : this.created_date,
        updated_by : this.updated_by,
        updated_date : this.updated_date
    }
}

module.exports = M_kota