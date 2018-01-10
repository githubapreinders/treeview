(function ()
{
    'use strict';
    /*TODO's : adding new directory / new file button*/
    angular.module('confab')
        .controller('IndexController', function ($scope,ZipService)
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
            vm.list = ZipService.init();
            var deleted;
            vm.treeOptions=
            {
                removed : function(node)
                {
                    console.log("removed node ", node.$modelValue, "\n", vm.list);
                    $scope.$watch(vm.list,function()
                    {
                        if(deleted)
                        {
                            console.log("vm.list...",  vm.list);
                            if(node.$modelValue.isDirectory)
                            {

                            }
                            else
                            {
                                var array = JSON.stringify(vm.list);
                                console.log(typeof array);
                                if (!(traverseArray(array)))
                                {
                                    console.log("rejecting deletion...");
                                    newSubitem(node);
                                }
                            }
                          deleted = false;  
                        }
                    });


                    
                }
            };

            function traverseArray(sublist)
            {
             //sublist = JSON.parse(sublist);
             console.log("coming in ", sublist[0].title,sublist[0].nodes,"\n\n",sublist, typeof sublist);   
                var ok;
                for(var i = 0 ; i < sublist.length; i++)
                {
                    console.log("item",sublist[i].title);
                    if(!(sublist[i].isDirectory)) 
                    {
                        console.log("match", sublist[i]);
                        ok = true;
                        break;
                    }
                    if(sublist[i].nodes.length > 0)
                    {
                        traverseArray(sublist[i].nodes);
                    }
                }
                return ok;
            }

            /* Sets the name of the tree item contenteditable and places the caret; 
            On enter or on blur the nameGiver directive updates the model with the current viewvalue.
            */
            function changeName(item)
            {
                var element = document.getElementById('treeitem' + item.$modelValue.id);
                console.log("item",element);
                element.setAttribute('contentEditable', true);
                var textnode = element.firstChild;
                var caret = textnode.length;
                var range = document.createRange();
                range.setStart(textnode, 0);
                range.setEnd(textnode, caret);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                element.focus();
                

            }

            function change()
            {

            }

            /*
                Removes an item from the tree after checking if the user doesn't check the last item.
                Also the corresponding slot must be deleted and the model updated accordingly.
                object one level higher in the hierarchy: object.$parentNodeScope
                siblings of the current object : object.$parentNodesScope.$modelValue   (note the small 's' difference)
            */
            function remove(object)
            {
                var theid = object.$modelValue.id;
                var parking = getRoot(object);
                var nodetype = object.$modelValue.isDirectory;
                var counter = 0;

                if(nodetype)//if it is a directory we want to remove
                {
                    var currentLayer = object;

                    while(currentLayer !== null && counter < 10)
                    {
                          if(lookForDirectory(currentLayer.$parentNodesScope.$modelValue, object.$modelValue.id))
                            {
                                console.log("removable: ", object.$modelValue.title);
                                object.remove();
                                break;
                            }
                          else
                          {
                            currentLayer = currentLayer.$parentNodeScope;
                            console.log("watchin layer above" ,currentLayer );
                          }    
                          counter++;
                    }
                }
                else//if it is a file we want to remove
                {
                    if(traverseArray(parking.$parentNodesScope.$modelValue, false))
                    {
                        console.log("removable: ", object.$modelValue.title);
                        object.remove();
                    }
                }

                function getRoot(obj)
                {
                    var parking = obj;
                    while(parking.$parentNodeScope !== null)
                    {
                        parking = parking.$parentNodeScope ;
                    }
                    console.log("root:", parking.$parentNodesScope.$modelValue);
                    return parking;
                }

                function traverseArray(sublist, ok)
                {
                    
                    if(ok){return ok;}
                    for(var i = 0 ; i<sublist.length; i++)
                    {
                        console.log(sublist[i].title,sublist[i].id);
                        if(!(sublist[i].isDirectory) && sublist[i] !== object.$modelValue) 
                        {
                            console.log("match with", sublist[i].title);
                            ok = true;
                            break;
                        }
                        else
                        {
                            if(sublist[i].nodes.length > 0)
                            {
                                ok = traverseArray(sublist[i].nodes, ok);
                            }
                        }
                    }
                    return ok;
                } 

                function lookForDirectory(sublist, callerid)
                {
                    for (var i = 0 ; i < sublist.length ; i ++)
                    {
                        if(sublist[i].isDirectory && sublist[i].id !== callerid)
                        {
                            console.log("found directory" , sublist[i].title);
                            return true;
                        }
                    }
                }                 

                



            }

            function toggle(item)
            {
               item.toggle();
            }


            function newSubitem(item)
            {
                //console.log("parent:",item.$parent.$parent.$parent.$parent.$modelValue.title);
                var theitem = item.$modelValue;
                console.log(theitem);

                if(theitem.isDirectory)
                {
                    theitem.nodes.push({
                    id: Math.floor(Math.random()*10000) ,
                    title: theitem.title ,
                    isDirectory : true,
                    nodes: []
                    });
                }
                else
                {
                    if(item.$parentNodeScope !== null)
                    {
                        item.$parentNodeScope.$modelValue.nodes.push({
                            id: Math.floor(Math.random()*10000) ,
                            title: theitem.title + '.' + (theitem.nodes.length + 1),
                            isDirectory : false,
                            nodes: []
                            });
                    }
                    else
                    {
                        vm.list.push(
                            {
                                id: Math.floor(Math.random()*10000) ,
                                title: theitem.title + '.' + (theitem.nodes.length + 1),
                                isDirectory : false,
                                nodes: []
                            });
                        console.log("item:", item);
                    }
                }
            }

            vm.distortedText = vm.list;

            function submitForm()
            {
            	vm.distortedText = "it works...";
            }

        });

})();


