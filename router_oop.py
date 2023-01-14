class Router:
    def __init__(self, graph, startPointKey, endPointKey):
        self.graph = graph
        self.startPointKey = startPointKey
        self.startPointRelations = graph[startPointKey]
        self.endPointKey = endPointKey
        self.endPointRelations = graph[endPointKey]
        self.allRoutes = []

        self.breakPoint = 300
        self.counter = 0


    def searchRoute(self, currentPointKey, routeHistory):

        print("\n\n*******************")
        print("function called !")
        print("*******************")

        if self.counter > self.breakPoint:
            print("****************\n")
            print("too much call for this function !")
            print("****************\n")
            exit()
            return 0
        self.counter += 1

        currentPointRelations = graph[currentPointKey]
        routeHistoryKeys = []
        if routeHistory is not None:
            for routeKey in routeHistory:
                routeHistoryKeys.append(routeKey[0])
            if len(routeHistory) > 0:
                routeHistoryKeys.append(routeHistory[len(routeHistory)-1][1])

        print("currentPointKey : ", currentPointKey)
        print("currentPointRelations : ", currentPointRelations)
        print("routeHistory : ", routeHistory)
        print("routeHistoryKeys : ", routeHistoryKeys)



        for relatedPoint in currentPointRelations:
            if relatedPoint[0] == self.endPointKey:
                print("check if endPoint is available between currentPointRelations !")
                if routeHistory is not None:
                    temp = routeHistory
                    temp.append([currentPointKey, relatedPoint[0], relatedPoint[1], relatedPoint[2]])
                else:
                    temp = [[currentPointKey, relatedPoint[0], relatedPoint[1], relatedPoint[2]]]
                if self.allRoutes is not None:
                    self.allRoutes.append(temp)
                else:
                    self.allRoutes = [temp]
                print("i found the route ! and its : \n", temp)
                return 1


        for relatedPoint in currentPointRelations:
            if relatedPoint[0] not in routeHistoryKeys:
                if routeHistory is not None:
                    temp = []
                    print("a fucking simple question : ", [] == None)
                    for i in routeHistory:
                        temp.append(i)
                    temp.append([currentPointKey, relatedPoint[0], relatedPoint[1], relatedPoint[2]])
                    print("temp was array , now temp is : ", temp)
                else:
                    temp = [[currentPointKey, relatedPoint[0], relatedPoint[1], relatedPoint[2]]]
                    print("temp was None , now temp is : ", temp)
                print("what the hell am i passing to next function ?")
                print("temp is line 58 : ", temp)
                self.searchRoute(relatedPoint[0], temp)

        return False



    def fire(self):
        self.searchRoute(self.startPointKey, [])

    def showResults(self):
        print("\n\ncongrates !\n\n")
        for k in self.allRoutes:
            print(k, '\n')

        if self.allRoutes is not None:
            totalDistance = 0
            totalTime = 0

            temp = 1000000000000000000
            for route in self.allRoutes:
                for routePart in route:
                    totalDistance += routePart[3]
                    totalTime += routePart[2]
                totals = [totalTime, totalDistance]
                kasr = totalTime / totalDistance
                print("the best answer is : ", route, "\nmeasured quantity is : ", kasr)
                print("total distance : ", totalDistance, "\ntotal time : ", totalTime)
                if (kasr < temp):
                    temp = kasr
                    answer = route
                    totals_final = totals
        else:
            answer = None
            kasr = "Infinity"
            totals_final = [None, None]
        print("*********\nthe best answer is : ")
        print("the best answer is : ", answer, "\nmeasured quantity is : ", kasr)
        print("total distance : ", totals_final[1], "\ntotal time : ", totals_final[0])

        
        






graph = {
    'a' : [['b', 3, 4], ['c', 4, 3]],
    'b' : [['a', 3, 2], ['d', 2, 3], ['e', 5, 4]],
    'c' : [['a', 4, 3], ['d', 3, 2]],
    'd' : [['c', 3, 2], ['b', 2, 4], ['e', 6, 7]],
    'e' : [['b', 5, 4], ['d', 6, 5], ['g', 1, 1]],
    'f' : [['b', 6, 5], ['g', 3, 2]],
    'g' : [['e', 1, 2], ['f', 3, 4]],
}


router = Router(graph, 'e', 'c')
router.fire()
router.showResults()













