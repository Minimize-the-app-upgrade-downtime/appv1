const express = require('express');
const router = express.Router();


//view eployee
router.get('/viewemployee',(req,res)=>{
    
    let  sql = `call v1_0_1_u_viewemployee()`;
    db.query(sql,true,(err,results)=>{
        if(err){
            console.log(err);
            res.send({state:"400",msg:"Error in database operation !!"})
        } else{

            console.log(results);
            res.send({status:"200",data:results[0]});
        }
        
        
    });
});



// add employee to DB
router.post('/addFormEmployee',(req,res)=>{
    console.log(req.body);

   let employeeNumber = req.body.employeeNumber;
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let email = req.body.email;
   let officeCode = req.body.officeCode;
   let jobTitle = req.body.job;

   let sql = `call v1_0_1_u_addemployee(?,?,?,?,?,?)`;
    
   db.query(sql,[employeeNumber,firstName,lastName,email,officeCode,jobTitle],
      (err,results)=>{
          if (err){
            console.log(err)
            res.send({state:"400",msg:"Error in database operation !!"});
          } else {
            res.send({state:"200",msg:"Employee Data Successfully Added!!"});
          }
      });
});

router.get('/deleteemployee/:id',(req,res)=>{
    //console.log(req.params.id);

    let employeeNumber = req.params.id;

    let sql = `call v1_0_1_u_deleteEmployee(?)`;

    db.query(sql,[employeeNumber],(err,results)=>{
        if (err){
            console.log(err);
        }

            
        let  sql = `call v1_0_1_u_viewemployee()`;

        db.query(sql,(err,results)=>{
            if (err) throw err;

            //console.log(results);
            res.render('pages/viewemployee',{data : results[0]});
        });
        
    })
});

router.get('/updateemployee/:id',(req,res)=>{
    //console.log(req.params.id);

    let id = req.params.id;
    let sql = `call v1_0_1_u_findIdbyupdateemployee(?)`;

    db.query(sql,[id],(err,results)=>{
        if (err) {
            console.log(err);
        }

        res.render('pages/updateemployee',{data : results[0]});
        //console.log(results[0]);
       
    });


});

router.post('/updateFormEmployee',(req,res)=>{
    // console.log(req.body);
    
    let employeeNumber = req.body.employeeNumber;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let officeCode = req.body.officeCode;
    let jobTitle = req.body.job;
    
    let sql = `call updateEmployee(?,?,?,?,?,?)`;

    db.query(sql,[employeeNumber,firstName,lastName,email,officeCode,jobTitle],(err,results)=>{
        if (err) throw err;

        let  sql = `call viewemployee()`;

        db.query(sql,(err,results)=>{
            if (err) throw err;

            //console.log(results);
            res.render('pages/viewemployee',{data : results[0]});
        });
        
    });
});
module.exports = router;

