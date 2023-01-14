class Router
{
    graph;

    startPoint;
    startPointKey;
    endPoint;
    endPointKey;

    blockList;

    parentPointKey;
    allRoutes = [];

    breakPoint = 5;
    counter = 0;


    constructor(graph, startPointKey, endPointKey) {
        this.graph = graph;
        this.startPointKey = startPointKey;
        this.startPoint = this.graph[startPointKey];
        this.endPointKey = endPointKey;
        this.endPoint = this.graph[endPointKey];
        this.allRoutes = [];
    }

    searchRoute(pointsData = {"currentPointKey":this.startPointKey, "parentPointKey":null, "routeHistory":[]})
    {
        console.log("\n\n**************\nfunction call !\n**************")
        if (this.counter > this.breakPoint)
        {
            console.log("****************\n")
            console.log("too much call for this function !")
            console.log("****************\n")
            return false;
        }

        this.counter++;

        var currentPoint, parentPointKey, currentPointKey, routeHistory;
        currentPoint = this.graph[pointsData["currentPointKey"]];
        currentPointKey = pointsData["currentPointKey"];
        parentPointKey = pointsData["parentPointKey"];
        routeHistory = pointsData["routeHistory"];

        console.log('current point : ', pointsData["currentPointKey"], ' parentPointKey : ', parentPointKey, ' routeHistory : ', routeHistory)

        console.log("beggining of the while loop current point key is : " , pointsData["currentPointKey"] ," -> " , currentPoint)

        // if related point contains the end point key
        // then push related point data to the routeHistory 
        for(const relatedPoint of currentPoint){
            if (relatedPoint.includes(this.endPointKey))
            {
                routeHistory.push([currentPointKey, relatedPoint[0], relatedPoint[1] , relatedPoint[2]])
                
                // and here i am collecting all possible routes 
                // and saving them into the allRoutes property in current object 
                this.allRoutes.push(routeHistory)
                console.log("found a straight way / route to end point key !, routeHistory is : ", routeHistory);
                return 1;
            }
        }

        // *******************************
        // block scope for checking all related routes are block or not
        // *******************************


        if (currentPoint.length == 1 && currentPoint[0][0] == parentPointKey)
        {
            return 0;
        }


        for (const relatedPoint of currentPoint) {
            if (relatedPoint[0] != parentPointKey)
            {
                console.log("relatedPoint in line 80 : ", relatedPoint);
                let temp = routeHistory;
                let newArray = new Array();
                newArray[0] = currentPointKey;
                newArray[1] = relatedPoint[0];
                newArray[2] = relatedPoint[1];
                newArray[3] = relatedPoint[2];

                this.searchRoute({
                    "currentPointKey": relatedPoint[0],
                    "parentPointKey": currentPointKey,
                    "routeHistory":temp
                });
            }
        }




    }


    fire()
    {
        this.searchRoute();
        console.log(this.allRoutes);
    }


}


let graph = {
    'a' : [['b', 3, 4], ['c', 4, 3]],
    'b' : [['a', 3, 2], ['d', 2, 3], ['e', 5, 4]],
    'c' : [['a', 4, 3], ['d', 3, 2]],
    'd' : [['c', 3, 2], ['b', 2, 4], ['e', 6, 7]],
    'e' : [['b', 5, 4], ['d', 6, 5], ['g', 1, 1]],
    'f' : [['b', 6, 5], ['g', 3, 2]],
    'g' : [['e', 1, 2], ['f', 3, 4]],
};

let router = new Router(graph, 'e', 'c');


router.fire();