let graph = {
    'a' : [['b', 3, 4], ['c', 4, 3]],
    'b' : [['a', 3, 2], ['d', 2, 3], ['e', 5, 4]],
    'c' : [['a', 4, 3], ['d', 3, 2]],
    'd' : [['c', 3, 2], ['b', 2, 4], ['e', 6, 7]],
    'e' : [['b', 5, 4], ['d', 6, 5], ['g', 1, 1]],
    'f' : [['b', 6, 5], ['g', 3, 2]],
    'g' : [['e', 1, 2], ['f', 3, 4]],
};
var startPointKey = 'e';
var endPointKey = 'c';


var blockList = []
var finalResult = []


var currentPoint , currentPointKey , startPoint, endPoint, parentPointKey, result;
let allBlocked, nextPoint;

var isDone = false;

while (true)
{
    currentPoint = graph[startPointKey];
    currentPointKey = startPointKey;
    startPoint = graph[startPointKey];
    endPoint = graph[endPointKey];
    parentPointKey = null;
    currentPoint = graph[startPointKey];
    currentPointKey = startPointKey;
    startPoint = graph[startPointKey];
    endPoint = graph[endPointKey];
    parentPointKey = null;
    result = []


    var tempIsEverythingDone = true;

    // check if all related points to start point are 
    // blocked
    startPoint.forEach(relatedPoint => {
        if (!blockList.includes(relatedPoint))
        {
            tempIsEverythingDone = false;
        }
    });

    if (tempIsEverythingDone) {break;}
    
    let result = [];

    while (currentPointKey != endPointKey) {


        console.log("current point is : ", currentPoint)
        currentPoint.forEach(relatedPoint => {
            if (relatedPoint.includes(endPointKey))
            {
                isDone = true;
            }
        });
        if (isDone) break;


        let allBlocked = true;
        
        for (relatedPoint of currentPoint)
        {
            if ( !blockList.includes(relatedPoint[0]) && (relatedPoint[0] != parentPointKey))
            {
                allBlocked = false;
                break;
            }
        }


        if (currentPoint.length == 1 && currentPoint[0][0] == parentPointKey)
        {
            blockList.push(currentPointKey)
            if (parentPointKey == null) {currentPoint = startPointKey;}
            else {currentPoint = graph[parentPointKey]}
        }
        else if (allBlocked) {
            blockList.push(currentPointKey)
            if (parentPointKey == null) {currentPoint = startPointKey;}
            else {currentPoint = graph[parentPointKey]}
        }



        let nextPoint = [1, 1000000000000000000, 1];

        for (relatedPoint of currentPoint) {
            if (!blockList.includes(relatedPoint[0]) && (relatedPoint[0] != parentPointKey) )
            {
                if ((relatedPoint[1] / relatedPoint[2]) < (nextPoint[1] / nextPoint[2])) {
                    nextPoint = relatedPoint;
                }
            }
        }

        if (nextPoint[0] != 1) {
            result.push([currentPointKey, nextPoint[0], nextPoint[1] / nextPoint[2]]);
            parentPointKey = currentPointKey;
            currentPoint = graph[nextPoint[0]];
            currentPointKey = nextPoint[0]
        }
        else {
            blockList.push(currentPointKey);
            currentPoint = startPoint;
        }




    // end of second while loop
    }


    if (result.length >= 2) {
        blockList.push(result[1][0])
    }
    finalResult.push(result)

    console.log("result is pushed to final result")
    console.log("final result is : ", finalResult)


}