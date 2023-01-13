test = {
    'a' : [['b', 3], ['c', 4]],
    'b' : [['a', 3], ['d', 2], ['e', 5]],
    'c' : [['a', 4], ['d', 3]],
    'd' : [['c', 3], ['b', 2], ['e', 6]],
    'e' : [['b', 5], ['d', 6], ['g', 1]],
    'f' : [['b', 6], ['g', 3]],
    'g' : [['e', 1], ['f', 3]],
}


blockList = []
finalResult = []


isEverythingDone = False
while not isEverythingDone:
    temp = test['e']
    tempKey = 'e'
    startPoint = test['e']
    parentPoint = None
    endPoint = test['c']
    endPointKey = 'c'

    tempIsEverythingDone = True
    for k in test['e']:
        if k[0] not in blockList:
            tempIsEverythingDone = False
            print('everything done, blockList : ', blockList)
            print(k[0] in blockList)
    if tempIsEverythingDone:
        break




        
    result = []

    while temp != endPoint:
        isDone = False
        for i in temp:
            if endPointKey in i:
                print('found a straight way to endPointKey !')
                result.append([tempKey, i[0], i[1]])
                isDone = True
                break
        if isDone:
            break


        allBlocked = True
        for item in temp:
            if (item[0] not in blockList) and (item[0] != parentPoint):
                allBlocked = False
                break
        #  check if all items in temp are blocked
        if len(temp) == 1 and temp[0][0] == parentPoint:
            print('temp just has one item inside it and its parentPoint ! temp is blocked !')
            blockList.append(tempKey)
            if parentPoint is None:
                temp = startPoint
            else:
                temp = test[parentPoint]
        elif allBlocked:
            print('all items are blocked , current point is : ', tempKey)
            blockList.append(tempKey)
            if parentPoint is None:
                print('temp returned to startPoint !')
                temp = startPoint
            else:
                print('temp returned to parentPoint !, parentPoint is : ', tempKey)
                temp = test[parentPoint]


        distanceTemp = [1, 1000000000000000000]
        for NextItemTemp in temp:
            if (NextItemTemp[0] not in blockList) and (NextItemTemp[0] != parentPoint):
                if NextItemTemp[1] < distanceTemp[1]:
                    distanceTemp = NextItemTemp
        if distanceTemp[0] != 1:
            print('temp is changed to next item ! temp is : ', distanceTemp[0])
            result.append([tempKey, distanceTemp[0], distanceTemp[1]])
            parentPoint = tempKey
            temp = test[distanceTemp[0]]
            tempKey = distanceTemp[0]
        else:
            print('long distance failed ')
            blockList.append(tempKey)
            temp = startPoint
    if len (result) >= 2:
        print('result len 01 is blocked : ', result[1][0])
        print('blocklist is  : ', blockList)
        blockList.append(result[1][0])
    finalResult.append(result)

temp = 1000000
for finalresulta in finalResult:
    ktemp = 0
    for j in finalresulta:
        ktemp += j[2]
    if ktemp < temp:
        temp = ktemp
    print('result is : ', finalresulta)
print('result is : ', ktemp)