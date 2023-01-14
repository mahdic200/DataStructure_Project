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

    breakPoint = 15;
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
        // if (this.counter > this.breakPoint)
        // {
        //     console.log("****************\n")
        //     console.log("too much call for this function !")
        //     console.log("****************\n")
        //     return false;
        // }

        this.counter++;

        var currentPoint, parentPointKey, currentPointKey;
        let routeHistory, routeHistoryKeys;
        currentPoint = this.graph[pointsData["currentPointKey"]];
        currentPointKey = pointsData["currentPointKey"];
        parentPointKey = pointsData["parentPointKey"];
        routeHistory = pointsData["routeHistory"];
        
        routeHistoryKeys = new Array()

        routeHistory.forEach(routeDetail => {
            routeHistoryKeys.push(routeDetail[0])
        });
        if (routeHistory.length > 0) {routeHistoryKeys.push(routeHistory[routeHistory.length - 1][1])}

        console.log("routeHistoryKeys : \n", routeHistoryKeys)

        console.log('current point : ', pointsData["currentPointKey"], ' parentPointKey : ', parentPointKey, ' routeHistory : \n', routeHistory)

        // console.log("beggining of the while loop current point key is : " , pointsData["currentPointKey"] ," -> " , currentPoint)

        // if related point contains the end point key
        // then push related point data to the routeHistory 
        let isThisWork = false;
        for(const relatedPoint of currentPoint){
            if (relatedPoint.includes(this.endPointKey))
            {
                let temp_2 = new Array();
            
                for (let i = 0; i < routeHistory.length; i++) {
                    temp_2[i] = routeHistory[i];
                }
                temp_2[temp_2.length] = [currentPointKey, relatedPoint[0], relatedPoint[1] , relatedPoint[2]];
                // temp_2.push([currentPointKey, relatedPoint[0], relatedPoint[1] , relatedPoint[2]])
                
                // and here i am collecting all possible routes 
                // and saving them into the allRoutes property in current object 
                this.allRoutes.push(temp_2)
                console.log("found a straight way ! routeHistory is : \n", temp_2);
                console.log("allRoutes : \n", this.allRoutes);
                isThisWork = true;
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
        if (isThisWork) {console.log("this mother fucker did not consider upper return :)")};
        for (const relatedPoint of currentPoint) {
            let temp = new Array();
            if (!routeHistoryKeys.includes(relatedPoint[0]))
            {
                for (let i = 0; i < routeHistory.length; i++) {
                    temp[i] = routeHistory[i];
                }
                temp[temp.length] = [currentPointKey, relatedPoint[0], relatedPoint[1], relatedPoint[2]];
                // temp.push([currentPointKey, relatedPoint[0], relatedPoint[1], relatedPoint[2]])
                console.log("checking what the hell am i passing ",
                "to next call , temp : \n",
                temp)
                this.searchRoute({
                    "currentPointKey": relatedPoint[0],
                    "parentPointKey": currentPointKey,
                    "routeHistory":temp
                });
            }
            temp = [];
        }




    }


    fire()
    {
        this.searchRoute();
    }

    showResults()
    {
        console.log("\n\ncongrates !\n\n");
        console.log(this.allRoutes);

        let scale, totalDistance, totalTime, smallestDistanceObject, smallestScaleObject, smallestTimeObject;
        if (this.allRoutes != null) {
            totalDistance = 0
            totalTime = 0

            smallestDistanceObject = {"totalDistance":10000000000};
            smallestScaleObject = {"scale":10000000000};
            for (const route of this.allRoutes) {
                for (const routePart of route) {
                    totalDistance += routePart[3]
                    totalTime += routePart[2]
                }
                scale = totalTime / totalDistance
                console.log("total distance : ", totalDistance, "\ntotal time : ", totalTime)
                console.log("route is : ", route, "\nmeasured quantity is : ", scale)
                if (scale < smallestScaleObject["scale"]) {
                    smallestScaleObject["scale"] = scale
                    smallestScaleObject["route"] = route
                    smallestScaleObject["totalDistance"] = totalDistance;
                    smallestScaleObject["totalTime"] = totalTime;
                }
                if (totalDistance < smallestDistanceObject["totalDistance"]) {
                    smallestDistanceObject["totalDistance"] = totalDistance;
                    smallestDistanceObject["totalTime"] = totalTime;
                    smallestDistanceObject["scale"] = scale;
                    smallestDistanceObject["route"] = route;
                }
            }

        }
        else {
            smallestScaleObject["totalDistance"] = "Infinite";
            smallestScaleObject["totalTime"] = "Infinite";
            smallestScaleObject["route"] = null;
            smallestScaleObject["scale"] = null;

            smallestDistanceObject["totalDistance"] = "Infinite";
            smallestDistanceObject["totalTime"] = "Infinite";
            smallestDistanceObject["scale"] = null;
            smallestDistanceObject["route"] = null;
        }
        console.log("smallestDistanceObject : ", smallestDistanceObject);
        console.log("smallestScaleObject : ", smallestScaleObject);


        let finalAnswerObject, noneScaleTemp;
        finalAnswerObject = smallestScaleObject;
        if () {

        }
        if (smallestDistanceObject["scale"] <= 5 && (smallestDistanceObject["totalDistance"] / smallestScaleObject["totalDistance"]) <= 0.7 ) {
            finalAnswerObject = smallestDistanceObject;
        }



        console.log("*****************************\n")
        console.log("the best route is : ", finalAnswerObject["route"], "\nmeasured scale is : ", finalAnswerObject["scale"])
        console.log("\ntotal time : ", finalAnswerObject["totalTime"], "\ntotal distance : ", finalAnswerObject["totalDistance"])
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
router.showResults();