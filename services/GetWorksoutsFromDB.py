import psycopg2



def getCurConn():
    postgresHost = "127.0.0.1"
    postgresDBName = "Workout"
    postgresUser = "postgres"
    postgrespw = "Theroo52!"
    conn = psycopg2.connect(
        host=postgresHost,
        database=postgresDBName,
        user=postgresUser,
        password=postgrespw)
    cur = conn.cursor()
    return cur, conn



def getDistinct(colName, tableName):
    cur, conn = getCurConn()
    try:
        cur.execute("select distinct \"" + colName + "\" from " + tableName)
        result = cur.fetchall()
        listOfVals = [i[0] for i in result]
        cur.close()
        conn.close()
        return listOfVals
    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
        cur.execute("ROLLBACK")
        conn.commit()
        return "Error"

def queryDB(tableName):
    cur, conn = getCurConn()
    try:
        cur.execute('''select "workout_id", "workout_date", "workout_type", "weight", "reps", "num_sets", "resistance_type" from ''' + tableName + ' order by 2 desc')
        result = cur.fetchall()
        return result
    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
        cur.execute("ROLLBACK")
        conn.commit()
        return "Error"


def queryDBWhere(tableName, colName, workoutName):
    cur, conn = getCurConn()
    try:
        cur.execute("select * from " + tableName + " where \"" + colName + "\"=%s order by 2", [workoutName])
        colnames = [desc[0] for desc in cur.description]
        result = cur.fetchall()
        listOfResults = []
        for i in result:
            rowList = []
            for j in range(len(colnames)):
                rowList.append(i[j])
            listOfResults.append(rowList)
        return listOfResults


    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
        cur.execute("ROLLBACK")
        conn.commit()
        return "Error"


def queryDBWhereMultiple(queryStatement, listOfVals):
  cur, conn = getCurConn()
  try:
    cur.execute(queryStatement, listOfVals)
    colnames = [desc[0] for desc in cur.description]
    result = cur.fetchall()
    listOfResults = []
    for i in result:
      rowList = []
      for j in range(len(colnames)):
        rowList.append(i[j])
      listOfResults.append(rowList)
    return listOfResults


  except (Exception, psycopg2.DatabaseError) as error:
    logger.error(error)
    cur.execute("ROLLBACK")
    conn.commit()
    return "Error"
