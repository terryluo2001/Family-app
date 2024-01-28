from flask import Flask, jsonify, request
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

@app.route('/add_patient')
def add_patient():
    firstName = request.args.get('firstName', default='', type=str)
    lastName = request.args.get('lastName', default='', type=str)
    mobileNo = request.args.get('mobileNo', default='', type=str)
    emailAddr = request.args.get('emailAddr', default='', type=str)
    streetAddr = request.args.get('streetAddr', default='', type=str)
    suburb = request.args.get('suburb', default='', type=str)
    dob = request.args.get('dob', default='', type=str)
    connection = pyodbc.connect(
        "DRIVER={SQL Server};SERVER=LAPTOP-DD8SJF6T\\SQLEXPRESS;DATABASE=Patients;Trusted_Connection=yes;"
    )
    cursor = connection.cursor()
    cursor.execute("SELECT TOP 1 id FROM Patients ORDER BY id DESC")
    result = cursor.fetchone()

    if result:
        id = result[0] + 1
    else:
        id = 1

    query = ("INSERT INTO [Patients] (id, [First Name], [Last Name], [Mobile Number], [Email Address], [Street Address], Suburb, [Date of birth], Active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Yes')")
    cursor.execute(query, (id, firstName, lastName, mobileNo, emailAddr, streetAddr, suburb, dob))
    connection.commit()
    connection.close()
    return jsonify([])

@app.route('/activate_patient')
def activate_patient():
    id = request.args.get('id', default='', type=str)
    connection = pyodbc.connect(
        "DRIVER={SQL Server};SERVER=LAPTOP-DD8SJF6T\\SQLEXPRESS;DATABASE=Patients;Trusted_Connection=yes;"
    )
    cursor = connection.cursor()
    query = ("UPDATE [Patients] SET Active = 'Yes' WHERE id = ?")
    cursor.execute(query, (id))
    connection.commit()
    connection.close()
    return jsonify([])

@app.route('/deactivate_patient')
def deactivate_patient():
    id = request.args.get('id', default='', type=str)
    connection = pyodbc.connect(
        "DRIVER={SQL Server};SERVER=LAPTOP-DD8SJF6T\\SQLEXPRESS;DATABASE=Patients;Trusted_Connection=yes;"
    )
    cursor = connection.cursor()
    query = ("UPDATE [Patients] SET Active = 'No' WHERE id = ?")
    cursor.execute(query, (id))
    connection.commit()
    connection.close()
    return jsonify([])


@app.route('/patient_details')
def patient_details():
    id = request.args.get('id', default='', type=str)
    connection = pyodbc.connect(
        "DRIVER={SQL Server};SERVER=LAPTOP-DD8SJF6T\\SQLEXPRESS;DATABASE=Patients;Trusted_Connection=yes;"
    )
    cursor = connection.cursor()
    if id != '':
        query = ("SELECT * FROM Patients WHERE id=?")
        cursor.execute(query, (id))
        rows = cursor.fetchall()
        connection.close()


        # Convert rows to a list of dictionaries
        patients = []
        for row in rows:
            patient_dict = {}
            for idx, column in enumerate(cursor.description):
                patient_dict[column[0]] = row[idx]
            patients.append(patient_dict)
        return jsonify(patients)
    else:
        return jsonify([])

@app.route('/update_patient')
def update_patient():
    id = request.args.get('id', default='', type=str)
    firstName = request.args.get('firstName', default='', type=str)
    lastName = request.args.get('lastName', default='', type=str)
    mobileNo = request.args.get('mobileNo', default='', type=str)
    emailAddr = request.args.get('emailAddr', default='', type=str)
    streetAddr = request.args.get('streetAddr', default='', type=str)
    suburb = request.args.get('suburb', default='', type=str)
    dob = request.args.get('dob', default='', type=str)

    connection = pyodbc.connect(
        "DRIVER={SQL Server};SERVER=LAPTOP-DD8SJF6T\\SQLEXPRESS;DATABASE=Patients;Trusted_Connection=yes;"
    )
    cursor = connection.cursor()
    cursor.execute("SELECT TOP 1 id FROM Patients ORDER BY id DESC")
    result = cursor.fetchone()

    query = ("UPDATE [Patients] SET [First Name] = ?, [Last Name] = ?, [Mobile Number] = ?, [Email Address] = ?, [Street Address] = ?, Suburb = ?, [Date of Birth] = ? WHERE id = ?")
    cursor.execute(query, (firstName, lastName, mobileNo, emailAddr, streetAddr, suburb, dob, id))
    connection.commit()
    connection.close()
    return jsonify([])
if __name__ == '__main__':
     app.run(host='127.0.0.1', port=5000)