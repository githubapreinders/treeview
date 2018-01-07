(function ()
{
    'use strict';

    angular.module('confab')
        .controller('IndexController',['$scope', function ($scope)
        {

            console.log('IndexController...');
            var vm = this;
            vm.submitForm = submitForm;
            vm.message = "Angular Controller is wired up";
            vm.remove = remove;
            vm.toggle = toggle;
            vm.newSubitem = newSubitem;
            var injector = angular.injector();
            
            vm.list = 
            [
            {
                "id":1,
                "title":"smashing",
                "nodes":[{
                "id":2,
                "title":"even more smashing",
                "nodes":[]
            },{
                "id":3,
                "title":"where does this stop",
                "nodes":[]
            }]
            }
            ];
            function remove(item)
            {
                item.remove();
            }

            function toggle(item)
            {
               item.toggle();
            }


            function newSubitem(item)
            {
                
            }

            vm.distortedText = vm.list;

            function submitForm()
            {
            	vm.distortedText = "it works..."
            }

        }]);
})();


