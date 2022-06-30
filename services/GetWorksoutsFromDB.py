import psycopg2
import os

import logzero
from logzero import logger

# Setup Logging
logDir = os.path.join(os.getcwd(), "Logs")
if not os.path.isdir(logDir):
    os.mkdir(logDir)

logFile = os.path.join(logDir, "workout.log")
logzero.logfile(logFile, maxBytes=1000000, backupCount=3)


# API Classes

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
        cur.execute("select distinct \"" + colName + "\" from " + tableName + " order by " + colName)
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

def queryDistinceDBWhere(tableName, colName, workoutName, orderBy, distinctCol):
    cur, conn = getCurConn()
    try:
      cur.execute(
        "select distinct(" + distinctCol + ") from " + tableName + " where \"" + colName + "\"=%s order by \"" +
        orderBy + "\"", [workoutName])
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


def queryDBWhere(tableName, colName, workoutName):
    cur, conn = getCurConn()
    try:
        cur.execute("select * from " + tableName + " where \"" + colName + "\"=%s order by 2 desc", [workoutName])
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

def getLastID(colName, tableName):
  cur, conn = getCurConn()
  try:
    cur.execute("select " + colName + " from " + tableName + " order by " + colName + " desc")
    result = cur.fetchall()
    workout_id = result[0][0]
    return workout_id


  except (Exception, psycopg2.DatabaseError) as error:
    print(error)
    cur.execute("ROLLBACK")
    conn.commit()
    return "Error"


def insertDataintoDB(query, vals):
    '''
    Inserts data into the PostgreSQL Database with the given insert query and values

    :param query: Insert query statement
    :type query: str
    :param vals: List of values to be inserted
    :type vals: list
    :return: Return "Error" if issues inserting data into database, otherwise returns "True"
    :rtype: str
    '''

    cur, conn = getCurConn()
    if cur == "Error":
        return "Error"
    else:
        try:
            cur.execute(query, vals)
            conn.commit()
            cur.close()
            conn.close()
            return "True"
        except (Exception, psycopg2.DatabaseError) as error:
            print("Error: %s" % error)
            conn.rollback()
            cur.close()
            return "Error"
