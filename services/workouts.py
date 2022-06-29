import json
import os
import flask
import psycopg2
from flask_cors import CORS

from flask import Flask, request, jsonify

import logzero
from logzero import logger
from GetWorksoutsFromDB import *

app = Flask(__name__)


# Setup Logging
logDir = os.path.join(os.getcwd(), "Logs")
if not os.path.isdir(logDir):
    os.mkdir(logDir)

logFile = os.path.join(logDir, "workout.log")
logzero.logfile(logFile, maxBytes=1000000, backupCount=3)


# API Classes

@app.route('/getMyWorkoutsByName', methods=["GET"])
def getMyWorkoutsByName():
    workoutName = request.args.get('Workout Name')
    user = request.args.get('User')
    logger.info("/workouts API was called - getting workouts now")
    queryStatement = '''select * from workouts where "workout_type"=%s and "user"=%s order by 2 desc'''
    listOfVals = [workoutName, user]
    results = queryDBWhereMultiple(queryStatement, listOfVals)
    formattedResults = []
    for i in results:
        singleResult = []
        date = i[1].strftime("%m/%d/%Y")
        singleResult.append(date)
        singleResult.append(i[2])
        singleResult.append(i[3])
        singleResult.append(i[4])
        singleResult.append(i[5])
        singleResult.append(i[6])
        formattedResults.append(singleResult)

    return jsonify(formattedResults)

@app.route('/getMyWorkoutsByResistanceAndPart', methods=["GET"])
def getMyWorkoutsByResistanceAndPart():
    logger.info("/getMyWorkoutsByResistanceAndPart API was called - getting workouts now")
    workoutName = request.args.get('Workout Name')
    resistance = request.args.get('Resistance')
    user = request.args.get('User')
    queryStatement = '''select * from workouts where "workout_type"=%s and "resistance_type"=%s and "user"=%s order by 2 desc'''
    listOfVals = [workoutName, resistance, user]
    result = queryDBWhereMultiple(queryStatement, listOfVals)
    print(result)
    formattedResults = []
    for i in result:
        singleResult = []
        date = i[1].strftime("%m/%d/%Y")
        singleResult.append(date)
        singleResult.append(i[2])
        singleResult.append(i[3])
        singleResult.append(i[4])
        singleResult.append(i[5])
        singleResult.append(i[6])
        formattedResults.append(singleResult)
    return jsonify(formattedResults)


@app.route('/getAllUniqueWorkouts', methods=["GET"])
def getAllUniqueWorkouts():
    uniqueresults = getDistinct("workout_type", "workouts")
    logger.info(str(uniqueresults))
    logger.info("/getAllUniqueWorkouts API was called - getting workouts now")
    return jsonify(uniqueresults)

@app.route('/getAllWorkouts', methods=["GET"])
def getAllWorkouts():
    results = queryDB("workouts")
    logger.info(str(results))
    logger.info("/getAllWorkouts API was called - getting workouts now")
    formattedResults = []
    for i in results:
        singleResult = []
        print(i)
        date = i[1].strftime("%m/%d/%Y")
        singleResult.append(date)
        singleResult.append(i[2])
        singleResult.append(i[3])
        singleResult.append(i[4])
        singleResult.append(i[5])
        singleResult.append(i[6])
        formattedResults.append(singleResult)
    return jsonify(formattedResults)


@app.route('/getAllWorkoutsByUser', methods=["GET"])
def getAllWorkoutsByUser():
    user = request.args.get('User')
    logger.info("/getAllWorkoutsByUser API was called - getting workouts now")
    queryStatement = '''select * from workouts where "user"=%s order by 2 desc'''
    listOfVals = [user]
    result = queryDBWhereMultiple(queryStatement, listOfVals)
    print(result)
    formattedResults = []
    for i in result:
        singleResult = []
        date = i[1].strftime("%m/%d/%Y")
        singleResult.append(date)
        singleResult.append(i[2])
        singleResult.append(i[3])
        singleResult.append(i[4])
        singleResult.append(i[5])
        singleResult.append(i[6])
        formattedResults.append(singleResult)
    return jsonify(formattedResults)


@app.route('/getAllWorkoutsByBodyPart', methods=["GET"])
def getAllWorkoutsByBodyPart():
    bodyPart = request.args.get('Body Part')
    user = request.args.get('User')
    logger.info(str(bodyPart))
    logger.info("/getAllWorkoutsByBodyPart API was called - getting workouts now")
    results = queryDBWhere("Workout_BodyPart", "bodypart_type", bodyPart)
    justParts = []
    for i in results:
        justParts.append(i[1])
    return jsonify(justParts)


@app.route('/getAllWorkoutsByResistance', methods=["GET"])
def getAllWorkoutsByResistance():
    resistance = request.args.get('Resistance')
    logger.info(str(resistance))
    logger.info("/getAllWorkoutsByResistance API was called - getting workouts now")
    results = queryDBWhere("workout_resistance", "resistance_type", resistance)
    workout = []
    for i in results:
        workout.append(i[1])
    return jsonify(workout)


@app.route('/addNewWorkout', methods=["GET", "POST"])
def postNewWorkout():
    #logger.info("/addNewWorkout was called - adding workout now")
    inputDate = request.args.get("Date")
    print(inputDate)
    workoutType = request.args.get("Workout")
    weight = request.args.get("Weight")
    reps = request.args.get("Reps")
    num_sets = request.args.get("Sets")
    resistence_type = request.args.get("Resistance Type")
    user = request.args.get("User")
    workoutID = getLastWorkoutID()
    print(workoutID)
    newWorkoutID = int(workoutID) + 1
    query = '''insert into workouts ("workout_id", "workout_date", "workout_type", "weight", "reps", "num_sets", "resistance_type", "user")
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s)'''
    vals = [newWorkoutID, inputDate, workoutType, weight, reps, num_sets, resistence_type, user]
    print(vals)
    results = insertDataintoDB(query, vals)
    print(results)

    return jsonify(results)
# Run Startup Tasks
#startUpTasks()
# Run Flask application
app.run(host="192.168.1.224", port=5000, threaded=True)
CORS(app)
# To start server in production mode, simply comment the line above and uncomment the two lines below

# from waitress import serve
# serve(app, host="0.0.0.0", port=5000)
