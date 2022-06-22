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
    uniqueresults = getDistinct("workout_type", "workouts")
    logger.info(str(uniqueresults))
    logger.info("/workouts API was called - getting workouts now")
    results = queryDBWhere("workouts", "workout_type", workoutName)

    for i in results:
        print(str(type(i[1])))

    return str(results)

@app.route('/getMyWorkoutsByDate', methods=["GET"])
def getMyWorkoutsByDate():
    pass
#get MY workout by date - need to properly format date


@app.route('/getAllUniqueWorkouts', methods=["GET"])
def getAllUniqueWorkouts():
    uniqueresults = getDistinct("workout_type", "workouts")
    logger.info(str(uniqueresults))
    logger.info("/getAllUniqueWorkouts API was called - getting workouts now")
    return str(uniqueresults)

@app.route('/getAllWorkouts', methods=["GET"])
def getAllWorkouts():
    results = queryDB("workouts")
    logger.info(str(results))
    logger.info("/getAllWorkouts API was called - getting workouts now")
    return jsonify(results)


@app.route('/getAllWorkoutsByBodyPart', methods=["GET"])
def getAllWorkoutsByBodyPart():
    bodyPart = request.args.get('Body Part')
    logger.info(str(bodyPart))
    logger.info("/getAllWorkoutsByBodyPart API was called - getting workouts now")
    results = queryDBWhere("Workout_BodyPart", "bodypart_type", bodyPart)
    justParts = []
    for i in results:
        justParts.append(i[1])
    return jsonify(justParts)


@app.route('/addNewWorkout', methods=["POST"])
def postNewWorkout():
    pass
#need to have:
    #date
    #workout_type
    #weight
    #reps
    #num_sets
    #resistence_type



# Run Startup Tasks
#startUpTasks()
# Run Flask application
app.run(host="0.0.0.0", port=5000, threaded=True)
CORS(app)
# To start server in production mode, simply comment the line above and uncomment the two lines below

# from waitress import serve
# serve(app, host="0.0.0.0", port=5000)
