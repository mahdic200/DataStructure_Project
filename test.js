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

currentPoint = graph[startPointKey];
currentPointKey = startPointKey;
startPoint = graph[startPointKey];
endPoint = graph[endPointKey];
parentPointKey = null;
result = []


for (let i = 0; i < 25; i++)
{

    if (currentPointKey != endPointKey)
    {
        console.log("beggining of the while loop current point key is : " , currentPointKey ," -> " , currentPoint)
        for(relatedPoint of currentPoint){
            if (relatedPoint.includes(endPointKey))
            {
                result.push([currentPointKey, relatedPoint[0], relatedPoint[1] / relatedPoint[2]])
                if (result.length >= 2) {
                    blockList.push(result[1][0])
                }
                finalResult.push(result)
                console.log("found a straight way / route to end point key !, result is : ", result);
                result = []
                currentPoint = startPoint;
                currentPointKey = startPointKey;
                parentPointKey = null;
                isDone = true;
                console.log("resetting variables")
                // break;
            }
        }
        if (isDone) {
            console.log("everything is done in second for loop, resetting variables")
            // console.log("break the while loop")
            isDone = false;
            // break
        }
        console.log("result is : ", result);
        
        
        allBlocked = true;
        console.log("check if all related points to start point are blocked !")
        
        for (relatedPoint of currentPoint)
        {
            if ( !blockList.includes(relatedPoint[0]) && (relatedPoint[0] != parentPointKey))
            {
                console.log("found one related point that its not block , related point : ", relatedPoint[0]);
                allBlocked = false;
                break;
            }
        }
        
        
        if (currentPoint.length == 1 && currentPoint[0][0] == parentPointKey)
        {
            blockList.push(currentPointKey)
            console.log("current point just has one related point and its parent !\n" +
            "current point : \"", currentPointKey, "\" added to blocklist, blocklist : ", blockList);
            if (parentPointKey == null) {currentPoint = startPointKey;}
            else {currentPoint = graph[parentPointKey]}
        }
        else if (allBlocked) {
            if (currentPointKey == startPointKey)
            {
                console.log("there is no another choice !\nall possible routes are discovered !",
                "breaking the while loop");
                blockList.push(currentPointKey)
                break;
            }
            blockList.push(currentPointKey)
            console.log("all related points are already blocked\ncurrent point is blocked , current point : ", currentPointKey, " blocklist : ", blockList);
            if (parentPointKey == null) {currentPoint = startPointKey;}
            else {currentPoint = graph[parentPointKey]}
        }
        
        
        
        nextPoint = [1, 1000000000000000000, 1];
        
        for (relatedPoint of currentPoint) {
            if (!blockList.includes(relatedPoint[0]) && (relatedPoint[0] != parentPointKey) )
            {
                if ((relatedPoint[1] / relatedPoint[2]) < (nextPoint[1] / nextPoint[2])) {
                    nextPoint = relatedPoint;
                }
            }
        }
        
        if (nextPoint[0] != 1) {
            console.log("find a point to change current point , next point is : ", nextPoint[0]);
            result.push([currentPointKey, nextPoint[0], nextPoint[1] / nextPoint[2]]);
            console.log("point is added to result , result is : ", result);
            parentPointKey = currentPointKey;
            currentPoint = graph[nextPoint[0]];
            currentPointKey = nextPoint[0]
        }
        else {
            console.log("did not find any available point to change ", 
            "current point, current point key is : ", currentPointKey)
            blockList.push(currentPointKey);
            currentPoint = startPoint;
            console.log("changed the current point to start point !")
        }
    }
    else {
        console.log("you have reached the end point !");
    }


}


console.log('final result is : ', finalResult)






