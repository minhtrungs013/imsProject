const candidateModel = require("../models/candidateModel");
const candidateController={
getcandidate: (req, res) => {
  candidateModel.get_all((data) => {
    res.send(data);
  });
},
getdetail : (req, res) => {
  candidateModel.getByID(req.params.id, (response) => {
    res.send(response);
  });
},
getbatch:(req,res)=>{
    candidateModel.getByIDcandidate(req.params.id,(response) => {
        res.send( response);
    })
},
createcandidate: (req, res) => {
  const data = req.body;
  candidateModel.create(data, (response) => {
    res.send(response );
  });
},
updatecandidate:(req, res) => {
  const id = req.body;
  candidateModel.update(id, (response) => {
    res.send( response );
  });
},

removecandidate : (req, res) => {
  const id = req.params.id;
  candidateModel.remove
  (id, (response) => {
    res.send( response );
  });
}
}
module.exports =candidateController
