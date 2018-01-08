(function ()
{
    'use strict';
    /*TODO's : adding new directory / new file button*/
    angular.module('confab')
        .controller('IndexController',['$scope', function ($scope)
        {

            console.log('IndexController...');
            var vm = this;
            vm.submitForm = submitForm;
            vm.message = "Angular Controller is wired up";
            vm.remove = remove;
            vm.toggle = toggle;
            vm.change = change;
            vm.changeName = changeName;
            vm.newSubitem = newSubitem;
            var injector = angular.injector();
            
            vm.list = 
            [
            {
                "id":1,
                "isDirectory":true,
                "title":"smashing",
                    "nodes":[{
                    "id":2,
                    "isDirectory":false,
                    "title":"even more smashing",
                    "nodes":[]
                },{
                    "id":3,
                    "isDirectory":false,
                    "title":"where does this stop",
                    "nodes":[]
                }]
            },{
                "id":4,
                "isDirectory":true,
                "title":"some title...", 
                "nodes":[]}
            ];

            function changeName(item)
            {
                var element = document.getElementById('treeitem' + item.$modelValue.id);
                console.log("item",element);
                element.setAttribute('contentEditable', true);
                element.focus();
            }

            function change()
            {

            }

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
                //console.log("parent:",item.$parent.$parent.$parent.$parent.$modelValue.title);
                var theitem = item.$modelValue;

                if(theitem.isDirectory)
                {
                    theitem.nodes.push({
                    id: Math.floor(Math.random()*10000) ,
                    title: theitem.title ,
                    isDirectory : true,
                    nodes: []
                })
                }
                else
                {
                    item.$parent.$parent.$parent.$parent.$modelValue.nodes.push({
                    id: Math.floor(Math.random()*10000) ,
                    title: theitem.title + '.' + (theitem.nodes.length + 1),
                    isDirectory : false,
                    nodes: []
                })
                }
            }

            vm.distortedText = vm.list;

            function submitForm()
            {
            	vm.distortedText = "it works..."
            }

        }]);
})();


