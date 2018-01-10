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
                                    sublist[i].title = text;
                                    console.log("match", sublist[i], text, scope.vm.mySlots);
                                    if(!(sublist[i].isDirectory))
                                    {
                                        scope.vm.mySlots[digit].title = text;
                                    }

                                    element.setAttribute('contentEditable', false);
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
    "id": 123,
    "title": "dir1",
    "isDirectory": true,
    "nodes": [
      {
        "id": 1,
        "title": "file1",
        "isDirectory": false,
        "isLocked": false,
        "nodes": []
      }
    ]
  },
  {
    "id": 145,
    "isDirectory": true,
    "isLocked": false,
    "title": "dir2",
    "nodes": [
      {
        "id": 2,
        "isDirectory": false,
        "isLocked": false,
        "title": "file2",
        "nodes": []
      },
      {
        "id": 3,
        "title": "file3",
        "isDirectory": false,
        "isLocked": false,
        "nodes": []
      },
      {
        "id": 6407,
        "title": "dir3",
        "isDirectory": true,
        "nodes": [
          {
            "id": 4,
            "title": "file4",
            "isDirectory": false,
            "isLocked": false,
            "nodes": []
          }
        ]
      },
      {
        "id": 5705,
        "title": "dir4",
        "isDirectory": true,
        "nodes": [
          {
            "id": 5,
            "title": "file5",
            "isDirectory": false,
            "isLocked": false,
            "nodes": []
          }
        ]
      },
      {
        "id": 2800,
        "title": "dir5",
        "isDirectory": true,
        "nodes": []
      },
      {
        "id": 2428,
        "title": "dir6",
        "isDirectory": true,
        "nodes": []
      }
    ]
  }
];
        return {
            init : init,
            getSlots : getSlots
        };

        function init()
        {
            return thelist;
        }

        function getSlots()
        {
            return {"1":{"title":"file1", "isLocked": false},
            "2":{"title":"file2", "isLocked": false},
            "3":{"title":"file3", "isLocked": false},
            "4":{"title":"file4", "isLocked": false},
            "5":{"title":"file5", "isLocked": false}
        } ;
        }


     });
}());

   

