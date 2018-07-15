

var customerapp = angular.module("customer-app", ['ngRoute']);

customerapp.controller('customerController', function($scope, CustomerService){
   



    // angular.element(document).ready(function () {
    //     $scope.getCustomers();
    
    // });

    $scope.init = function(){
        $scope.getCustomers();
    }

    $scope.getCustomers = function(){
        CustomerService.getCustomers().then(
        function success(response){
            $scope.customers = response.data;
        }),
        function error (response) {
            $scope.message='';
            $scope.errorMessgae = 'Error getting users';
            
        }
        // $scope.customers = response.data.customer;  
       
    }

    $scope.reset = function(){
        $scope.customer.cname = "";
        $scope.customer.nic  = "";
    }

    $scope.add = function(){
        CustomerService.addCustomer($scope.customer.cname, $scope.customer.nic)
            .then( 
                function  status(response){
                    if (response.statusText == "OK"){
                        alert("Successfully Added");
                        $scope.getCustomers();
                        $scope.reset();
                    }
                }
            );
    }
    $scope.delete = function(cust){
        $scope.nic = cust.nic;
        CustomerService.deleteCustomer($scope.nic)
            .then(
                function status(response){
                    if(response.statusText == "OK")  {
                        alert('Successfully Delete');
                        $scope.getCustomers();
                    }
                }
            );
        }
    $scope.rowclick = function(cust){
          

            
    }

        

  
   

});


   



// Service methods

customerapp.service('CustomerService', function($http){
    this.addCustomer = function(cname, nic){
        return $http({
            method: 'POST',
            url: 'http://localhost:1337/api/Customers',
            data:{
                cname : cname,
                nic : nic
            }

        });
    }
    this.getCustomers = function(){
        return $http({
            method: 'GET',
            url: 'http://localhost:1337/api/Customers/loadCustomers'
            
        });
    }
    this.deleteCustomer = function(nic){
        return $http({
            method: 'DELETE',
            url: 'http://localhost:1337/api/Customers/deleteCustomer?nic=' + nic
        });

    }    
});

customerapp.config( function ($routeProvider ){
        // $locationProvider.html5Mode(true);
        $routeProvider.when('/', {
            // templateUrl: '/index.html',
            // controller: 'customerController',
            // redirecTo : "/home"
        })

    });



