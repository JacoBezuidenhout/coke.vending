app.controller('employerController', function($scope,$http,$routeParams) 
    {
        var t = this;
        var id = $routeParams.id;
        t.employers = [];
        t.employersOrganisations = [];
        t.unions = [];

        t.alert = function(a)
        {
            console.log(a);
           //alert(JSON.stringify(a));
        }

        t.update = function()
        {
            $http.post(url + '/employer/update/' + t.employer.id, t.employer)
                .then(function(response) 
                {
                    $scope.$applyAsync(function(){
                        t.employer = response.data;
                        // t.refresh();
                        t.changed = false;
                    });
                }, function(response) 
                {
                    t.alert(response);
                });
        }

        t.refresh = function()
        {
            $http.get(url + '/employer/' + id)
                .then(function(response) 
                {
                    $scope.$applyAsync(function(){
                        t.employer = response.data;
                        console.log(response);
                    });
                }, function(response) 
                {
                    t.alert(response);
                });
            t.refreshUnion(function(){});
            t.refreshEO(function(){});
        }
        
        t.refreshEO = function(cb)
        {
            $http.get(url + '/employersOrganisation')
                .then(function(response) 
                {
                    $scope.$applyAsync(function(){
                        t.employersOrganisations = response.data;
                        console.log(response);
                    });
                }, function(response) 
                {
                    t.alert(response);
                });
        }

        t.refreshUnion = function(cb)
        {
            $http.get(url + '/union')
                .then(function(response) 
                {
                    $scope.$applyAsync(function(){
                        t.unions = response.data;
                        console.log(response);
                    });

                }, function(response) 
                {
                    t.alert(response);
                });
        }

        t.lookupOwner = function(o)
        {
            if (o.email.length > 7)
            {
                $http.get(url + '/owner?email=' + o.email)
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
                    }, function(response) 
                    {
                        t.alert(response);
                    });
            }
        }

        t.addOwner = function(o)
        {         
            $http.get(url + '/owner?email=' + o.email)
            .then(function(response) 
            {
                if (response.data.length == 1)
                {   
                    $scope.$applyAsync(function(){
                        t.employer.owners.push(response.data[0]);
                        console.log(response);
                        t.changed = true;
                    });
                }
                else
                {
                    $http.post(url + '/owner/create/', t.newOwner)
                    .then(function(response) 
                    {
                        $scope.$applyAsync(function(){
                            t.employer.owners.push(response.data);
                            console.log(response);
                            t.changed = true;
                        });
                    }, function(response) 
                    {
                        t.alert(response);
                    });                    
                }
            }, function(response) 
            {
                t.alert(response);
            });
        }

        t.rmOwner = function(o)
        {
            $scope.$applyAsync(function(){
                for (var i = 0; i < t.employer.owners.length; i++) 
                {
                    if (t.employer.owners[i].email == o)
                    {
                        t.employer.owners.splice(i,1);
                        t.changed = true;
                    }
                };
            }); 
        }

        t.lookupEmployee = function(e)
        {
            if (e.idNumber.length == 13)
            {
                $http.get(url + '/employee?idNumber=' + e.idNumber)
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
                    }, function(response) 
                    {
                        t.alert(response);
                    });
            }
        }

        t.addEmployee = function(e)
        {         
            $http.get(url + '/employee?idNumber=' + e.idNumber)
            .then(function(response) 
            {
                if (response.data.length == 1)
                {   
                    $scope.$applyAsync(function(){
                        t.employer.employees.push(response.data[0]);
                        t.newEmployee = {};
                        console.log(response);
                        t.changed = true;
                    });
                }
                else
                {
                    $http.post(url + '/employee/create/', t.newEmployee)
                    .then(function(response) 
                    {
                        $scope.$applyAsync(function(){
                            t.employer.employees.push(response.data);
                            t.newEmployee = {};
                            console.log(response);
                            t.changed = true;
                        });
                    }, function(response) 
                    {
                        t.alert(response);
                    });                    
                }
            }, function(response) 
            {
                t.alert(response);
            });
        }

        t.rmEmployee = function(e)
        {
            $scope.$applyAsync(function(){
                for (var i = 0; i < t.employer.employees.length; i++) 
                {
                    if (t.employer.employees[i].idNumber == e)
                    {
                        t.employer.employees.splice(i,1);
                        t.changed = true;
                    }
                };
            });   
        }

        t.refresh();

    });