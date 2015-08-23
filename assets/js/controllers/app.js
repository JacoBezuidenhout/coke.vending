angular.module('bcfoodEmployers', [])
    .controller('EmployeeController', function($scope,$http) 
    {
        var t = this;
        t.employees = [];
        t.refresh = function()
        {
            $http.get("/employee")
                .then(function(response){
                    $scope.$applyAsync(function(){
                        t.employees = response.data;
                    });
                }, function(response){

                });
        }
        t.select = function(e)
        {
            $scope.$applyAsync(function(){
                t.emp = e;
            });
        }
        t.save = function()
        {
            $http.post("/employee/update/" + t.emp.id, t.emp)
                .then(function(response){
                    $scope.$applyAsync(function(){
                        t.emp = response.data;
                        t.changed = false;
                        t.refresh();
                    });
                }, function(response){
                    console.log("ERROR",response)
                });
        }

        t.refresh();
    })
    .controller('EmployerController', function($scope,$http) 
    {
        var t = this;
        t.employers = [];
        t.employersOrganisations = [];
        t.unions = [];

        t.showLoading = function()
        {
            $scope.$applyAsync(function(){
                t.loading = true;
            });
        }
        
        t.hideLoading = function()
        {
            $scope.$applyAsync(function(){
                t.loading = false;
            });
        }

        t.alert = function(a)
        {
           alert(JSON.stringify(a));
        }

        t.create = function(e)
        {
            t.showLoading();
            $http.post('/employer/create',e)
                .then(function(response) 
                {
                    $scope.$applyAsync(function(){
                        t.employer = response.data;
                        t.newEmployer = {};
                        t.refresh();
                    });
                    t.hideLoading();
                }, function(response) 
                {
                    t.alert(response);
                    t.hideLoading();
                });
        }

        t.update = function(cb)
        {
            t.showLoading();
            $http.post('/employer/update/' + t.employer.id, t.employer)
                .then(function(response) 
                {
                    $scope.$applyAsync(function(){
                        t.employer = response.data;
                        t.refresh();
                    });
                    t.hideLoading();
                    cb();
                }, function(response) 
                {
                    t.alert(response);
                    t.hideLoading();
                    cb();
                });
        }

        t.delete = function(e)
        {
            t.showLoading();
            $http.get('/employer/destroy/' + e.id)
                .then(function(response) 
                {
                    $scope.$applyAsync(function(){
                        t.employer = response.data;
                        t.refresh();
                    });
                    t.hideLoading();
                }, function(response) 
                {
                    t.alert(response);
                    t.hideLoading();
                });
        }

        t.getEmployer = function(e)
        {
            $scope.$applyAsync(function(){
                t.employer = e;
                t.employer.owners = t.employer.owners || [];
            });
        }

        t.refresh = function()
        {
            t.showLoading();
            $http.get('/employer')
                .then(function(response) 
                {
                    $scope.$applyAsync(function(){
                        t.employers = response.data;
                        console.log(response);
                    });
                    t.hideLoading();
                }, function(response) 
                {
                    t.alert(response);
                    t.hideLoading();
                });
            t.refreshUnion(function(){});
            t.refreshEO(function(){});


        }
        
        t.refreshEO = function(cb)
        {
            t.showLoading();
            $http.get('/employersOrganisation')
                .then(function(response) 
                {
                    $scope.$applyAsync(function(){
                        t.employersOrganisations = response.data;
                        console.log(response);
                        cb();
                    });
                    t.hideLoading();
                }, function(response) 
                {
                    t.alert(response);
                    t.hideLoading();
                });
        }

        t.addEO = function(eo)
        {
            t.showLoading();
            $http.post('/employersOrganisation/create',eo)
                .then(function(response) 
                {
                    t.refreshEO(function(){
                        $scope.$applyAsync(function(){
                            t.employer.employersOrganisation = response.data.id;
                        });
                    });
                }, function(response) 
                {
                    t.alert(response);
                    t.hideLoading();
                });                
        }

        t.refreshUnion = function(cb)
        {
            t.showLoading();
            $http.get('/union')
                .then(function(response) 
                {
                    $scope.$applyAsync(function(){
                        t.unions = response.data;
                        console.log(response);
                        cb();
                    });
                    t.hideLoading();

                }, function(response) 
                {
                    t.alert(response);
                    t.hideLoading();
                });
        }

        t.addUnion = function(u)
        {
            t.showLoading();
            $http.post('/union/create',u)
                .then(function(response) 
                {
                    t.refreshUnion(function(){
                        $scope.$applyAsync(function(){
                            t.employer.union = response.data.id;
                        });
                    });
                }, function(response) 
                {
                    t.alert(response);
                    t.hideLoading();
                });                
        }

        t.lookupOwner = function(o)
        {
            if (o.email.length > 7)
            {
                t.showLoading();
                $http.get('/owner?email=' + o.email)
                    .then(function(response) 
                    {
                        if (response.data[0])
                        {   
                            $scope.$applyAsync(function(){
                                t.newOwner = response.data[0];
                                console.log(response);
                                t.addOwner(t.newOwner);    
                            });
                        }
                        t.hideLoading();
                    }, function(response) 
                    {
                        t.alert(response);
                        t.hideLoading();
                    });
            }
        }

        t.addOwner = function(o)
        {
             t.update(function()
             {
                 $http.post('/employer/' + t.employer.id + '/owners/add/', o)
                    .then(function(response) 
                    {
                        $scope.$applyAsync(function(){
                            t.employer = response.data;
                            t.refresh();
                            t.newOwner = {};
                        });
                        t.hideLoading();
                    }, function(response) 
                    {
                        t.alert(response);
                        t.hideLoading();
                    });
             });
        }

        t.rmOwner = function(o)
        {
            t.update(function()
            {
                $http.get('/employer/' + t.employer.id + '/owners/remove/' + o.id)
                    .then(function(response) 
                    {
                        $scope.$applyAsync(function(){
                            t.employer = response.data;
                            t.refresh();
                        });
                        t.hideLoading();
                    }, function(response) 
                    {
                        t.alert(response);
                        t.hideLoading();
                    });
           });
        }

        t.lookupEmployee = function(e)
        {
            if (e.idNumber.length > 7)
            {
                t.showLoading();
                $http.get('/employee?idNumber=' + e.idNumber)
                    .then(function(response) 
                    {
                        if (response.data[0])
                        {
                            $scope.$applyAsync(function(){
                                t.newEmployee = response.data[0];
                                console.log(response);
                                t.addEmployee(t.newEmployee);
                            });
                        }
                        t.hideLoading();
                    }, function(response) 
                    {
                        t.alert(response);
                        t.hideLoading();
                    });
            }
        }

        t.addEmployee = function(e)
        {
         
            t.update(function()
            {
                 $http.post('/employer/' + t.employer.id + '/employees/add/', e)
                    .then(function(response) 
                    {
                        $scope.$applyAsync(function(){
                            t.employer = response.data;
                            t.refresh();
                            t.newEmployee = {};
                        });
                        t.hideLoading();
                    }, function(response) 
                    {
                        t.alert(response);
                        t.hideLoading();
                    });
           });
        }

        t.rmEmployee = function(e)
        {
            t.update(function()
            {
                 $http.get('/employer/' + t.employer.id + '/employees/remove/' + e.id)
                    .then(function(response) 
                    {
                    
                        $scope.$applyAsync(function(){
                            t.employer = response.data;
                            t.refresh();
                        });
                    
                         $http.post('/employer/' + t.employer.id + '/pemployees/add/', e)
                            .then(function(response) 
                            {
                                t.hideLoading();
                            }, function(response) 
                            {
                                t.alert(response);
                                t.hideLoading();
                            });

                    }, function(response) 
                    {
                        t.alert(response);
                        t.hideLoading();
                    });
            });
        }

        t.refresh();

    });