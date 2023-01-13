graph = {
    'a' : [['b', 3, 4], ['c', 4, 3]],
    'b' : [['a', 3, 2], ['d', 2, 3], ['e', 5, 4]],
    'c' : [['a', 4, 3], ['d', 3, 2]],
    'd' : [['c', 3, 2], ['b', 2, 4], ['e', 6, 7]],
    'e' : [['b', 5, 4], ['d', 6, 5], ['g', 1, 1]],
    'f' : [['b', 6, 5], ['g', 3, 2]],
    'g' : [['e', 1, 2], ['f', 3, 4]],
}


blockList = []
finalResult = []


isEverythingDone = False
while not isEverythingDone:
    currentPoint = graph['e']
    currentPointKey = 'e'
    startPoint = graph['e']
    parentPoint = None
    endPoint = graph['c']
    endPointKey = 'c'

    tempIsEverythingDone = True
    for k in graph['e']:
        if k[0] not in blockList:
            tempIsEverythingDone = False
            print('everything done, blockList : ', blockList)
            print(k[0] in blockList)
    if tempIsEverythingDone:
        break




        
    result = []

    # main body of the program
    while currentPoint != endPoint:
        isDone = False
        for relatedPoint in currentPoint:
            if endPointKey in relatedPoint:
                print('found a straight way to endPointKey !')
                result.append([currentPointKey, relatedPoint[0], relatedPoint[1] / relatedPoint[2]])
                isDone = True
                break
        if isDone:
            break


        allBlocked = True
        for item in currentPoint:
            if (item[0] not in blockList) and (item[0] != parentPoint):
                allBlocked = False
                break
        #  check if all items in currentPoint are blocked
        if len(currentPoint) == 1 and currentPoint[0][0] == parentPoint:
            print('currentPoint just has one item inside it and its parentPoint ! currentPoint is blocked !')
            blockList.append(currentPointKey)
            if parentPoint is None:
                currentPoint = startPoint
            else:
                currentPoint = graph[parentPoint]
        elif allBlocked:
            print('all items are blocked , current point is : ', currentPointKey)
            blockList.append(currentPointKey)
            if parentPoint is None:
                print('currentPoint returned to startPoint !')
                currentPoint = startPoint
            else:
                print('currentPoint returned to parentPoint !, parentPoint is : ', currentPointKey)
                currentPoint = graph[parentPoint]


        distanceTemp = [1, 1000000000000000000, 1]
        for NextItemTemp in currentPoint:
            if (NextItemTemp[0] not in blockList) and (NextItemTemp[0] != parentPoint):
                if (NextItemTemp[1] / NextItemTemp[2]) < (distanceTemp[1] / distanceTemp[2]):
                    distanceTemp = NextItemTemp
        if distanceTemp[0] != 1:
            print('currentPoint is changed to next item ! currentPoint is : ', distanceTemp[0])
            result.append([currentPointKey, distanceTemp[0], distanceTemp[1] / distanceTemp[2]])
            parentPoint = currentPointKey
            currentPoint = graph[distanceTemp[0]]
            currentPointKey = distanceTemp[0]
        else:
            print('long distance failed ')
            blockList.append(currentPointKey)
            currentPoint = startPoint
    if len (result) >= 2:
        print('result len 01 is blocked : ', result[1][0])
        print('blocklist is  : ', blockList)
        blockList.append(result[1][0])
    finalResult.append(result)

temp = 1000000
for finalresult in finalResult:
    ktemp = 0
    for j in finalresult:
        ktemp += j[2]
    if ktemp < temp:
        temp = ktemp
        answer = finalresult
    print('result is : ', finalresult)
print('and the answer with points : ', answer)
print('result is : ', temp)