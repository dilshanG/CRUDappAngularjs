/**
 * CustomersController
 *
 * @description :: Server-side logic for managing Customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

customerAdding: function (req, res) {

        var cname = req.body.cname;
        var nic  = req.body.nic;
        sails.log('I am only log' + cname);
        sails.log.info('I am debug info');
        sails.log.warn('warning');
        sails.log.debug(cname);



        var values = {
          cname : cname,
          nic  : nic
        };

        Customers.create(values).exec(function (err, customer) {

          if (err) {
            return res.serverError(err);
          }
          return res.json(customer);
        });
      },
  updateCustomer: function( req, res){

        var cname = req.body.cname;
        var nic = req.body.nic;

        var valOne = {
        nic: req.body.nic
      }
      //  var valOne = { cname: req.param('cname')};
      //  var valTwo = { nic: req.param('nic')};

      //  var gff ={
      //   cname: req.param('cname'),
      //   nic: req.param('nic')
      //  }
        var values = {
          cname : cname,
          nic  : nic
        }

        Customers.update(valOne,values).exec(function (err, customer){

          if(err){
             return res.serverError(err)
             }
          return res.json(customer);
        });
  },

  findCustomer: function (req, res) {

        var criteria = { nic: req.param('nic') };
        Customers.findOne(criteria).exec(function (err, customer) {

          if (err) {
            return res.serverError(err);
          }

          if (customer) {
            return res.json(customer);
          }

        });
  },
  deleteCustomer: function (req, res) {
    sails.log.info('customer delete');
         var criteria = { nic: req.param('nic')};
        //  var criteria  = { nic: req.body.nic};

         sails.log.debug(criteria);
        // var criteria = { nic: req.body('nic')};


        Customers.destroy(criteria).exec(function (err, customer){
          sails.log('in destroy')
          if(err){
              return res.serverError(err);
          }
          sails.log('sa');
            return res.json(customer);

        });

  },
  loadCustomers: function (req, res) {

       sails.log('customer load');
        Customers.find({}).exec(function (err, customer) {

          if (err) {
            return res.serverError(err);
          }

          if (customer) {
            return res.json(customer);
          }

        });
  },

};

