(function()
{
    angular.module('confab')
     .directive('nameGiver', function()
        {
            return{
                restrict:"A",
                link : function(scope, el , attrs)
                {
                    el.bind('blur' , function(event)
                    {
                        var digit = event.target.id.match(/\d+/g);
                        element = document.getElementById('treeitem' + digit);
                        var text = element.innerHTML;
                        var thelist = scope.vm.list;
                        console.log("text",text, thelist, digit);
                       traverseArray(thelist);

                        function traverseArray(sublist)
                        {
                            for(var i = 0 ; i<sublist.length; i++)
                            {
                                console.log(sublist[i].title,sublist[i].id);
                                //compares int with a string, so NOT === in the comparator
                                if(sublist[i].id == digit) 
                                {
                                    console.log("match", sublist[i], text);
                                    sublist[i].title = text;
                                    scope.$apply();
                                    break;
                                }
                                if(sublist[i].nodes.length > 0)
                                {
                                    traverseArray(sublist[i].nodes);
                                }
                            }
                        }

                    });
                    el.bind(['keydown'],function(event)
                    {
                        var code = event.which || event.keyCode || eventt.charCode ;
                        console.log("code", code);
                        if (code === 13)// enter key
                        {
                            event.preventDefault();
                            var element = document.getElementById('treeitem'+event.target.id.match(/\d+/g));
                            element.setAttribute('contentEditable', false);
                            element.blur();
                        } 
                    });
                }
            };
        })
     .factory('ZipService', function ()
     {
        var thelist = 
        [
        {
            "id": 1,
            "isDirectory": true,
            "title": "dir1",
            "nodes": [
            {
                "id": 2,
                "isDirectory": false,
                "title": "file1",
                "nodes": []
            },
            {
                "id": 784,
                "title": "dir2",
                "isDirectory": true,
                "nodes": [
                {
                    "id": 5057,
                    "title": "file4",
                    "isDirectory": false,
                    "nodes": []
                }
                ]
            },
            {
                "id": 1105,
                "title": "dir3",
                "isDirectory": true,
                "nodes": []
            }
            ]
        },
        {
            "id": 9480,
            "title": "dir4",
            "isDirectory": true,
            "nodes": [
            {
                "id": 1819,
                "title": "file3",
                "isDirectory": false,
                "nodes": []
            }
            ]
        },
        {
            "id": 7895,
            "title": "file2",
            "isDirectory": false,
            "nodes": []
        }
        ];
        return {
            init : init
        };

        function init()
        {
            return thelist;
        }
     });
}());

   

