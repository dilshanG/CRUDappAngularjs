

var customerapp = angular.module("customer-app", []);

customerapp.controller('customerController',  function($scope, CustomerService){
   
   
    angular.element(document).ready(function () {

        $scope.getCustomers();
    });
   

    $scope.getCustomers = function(){
        CustomerService.getCustomers().then(function success(response){
            console.log(response.data);
            $scope.customers = response.data;
            console.log($scope.customers);
            // $scope.messsage ='';
            // $scope.errorMessgae ='';
        }),
        function error (response) {
            $scope.message='';
            $scope.errorMessgae = 'Error getting users';
            
        }
        // $scope.customers = response.data.customer;  
       
    }


    $scope.reset = function(){
        console.log("reset");
        $scope.cname = "";
        $scope.nic  = "";
    }

    $scope.add = function(){
        CustomerService.addCustomer($scope.customer.cname, $scope.customer.nic);
      
    }
    $scope.delete = function(cust){
         $scope.nic = cust.nic;
        CustomerService.deleteCustomer($scope.nic);
    }
  
   

});


// Service methods

customerapp.service('CustomerService', function($http){
    this.addCustomer = function addCustomer(cname, nic){
        return $http({
            method: 'POST',
            url: 'http://localhost:1337/api/Customers',
            data:{
                cname : cname,
                nic : nic
            }

        });
    }
    this.getCustomers = function getCustomers(){
        return $http({
            method: 'GET',
            url: 'http://localhost:1337/api/Customers/loadCustomers'
            
        });
    }
    this.deleteCustomer = function deleteCustomer(nic){
        return $http({
            method: 'DELETE',
            ur: 'http://localhost:1337/api/Customers/deleteCustomer/'+nic
        })

    }    
});
