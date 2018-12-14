let requestData = ["ME0001", "ME0002", "ME0003", "ME0005"];
let database = ["ME0001", "ME0005", "ME0010"];

const func = (arrRequest, arrDB)=>{
    let query = [];
    const func2 = ()=>{
        let query = [];
        let a = arrDB.filter(lala=>lala!=arrRequest[0]);
        arrRequest.map((content)=>{
            a =  a.filter(e=>e!=content);
        });
        return a;
    }
    const func4 = ()=>{
        let  b = arrRequest.filter(lala=>lala!=arrDB[0]);
        arrDB.map((content)=>{
            b = b.filter(e=>e!=content);
        });
        return b
    }    
    if(func2()[0] == null){
        query.push(null);
    }
    else{
        query.push(func2().map((content)=>{
            return content;
            //{"$and":[{"m_role_id": "RO0001"}, {"m_menu_id": content}]};
        }));
    }
    if(func4()[0] == null){
        query.push(null);
    }
    else {
        query.push(func4().map((content)=>{
            return {"m_role_id":"RO0001", "m_menu_id": content, "created_by": "Randika", "created_date":new Date().toDateString(), "updated_by": null, "updated_date": null}
        })); 
    }
    return query;
}

//[{"m_role_id":"RO0001", "m_menu_id": content, "created_by": "Randika", "created_date":new Date().toDateString(), "updated_by": null, "updated_date": null},{},{}]
// db.getCollection('m_menu_access').updateMany(
//     {
//     "$or": [a,b]
//     }
// )
console.log("ini yang di delete:");
console.log(JSON.stringify(func(requestData, database)[0]));
console.log("ini yang di insertMany");

console.log(JSON.stringify(func(requestData, database)[1]));

