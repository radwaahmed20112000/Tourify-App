
exports.getFeedPosts = (req , res) =>{
    //let filters = req.query
    
    let limit = query.limit || 100;
    let offset =query.offset || 0;

    let selectQuery = `SELECT * FROM POST LIMIT ${limit} OFFSET ${offset} `;
    
    // TODO ADD FILTER SERVICE TO GENERATE QUERY


    let query = mysql.format(selectQuery);

 try {
    let posts = DB(query)
    return res.json(posts);

 } catch(e){
     return res.code(500).json(e);


}

}