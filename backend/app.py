from flask import Flask, jsonify, request
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

@app.route('/get_family_members')
def get_family_members():
    search_query = request.args.get('search', default='', type=str)
    connection = pyodbc.connect(
        "DRIVER={SQL Server};SERVER=LAPTOP-DD8SJF6T\\SQLEXPRESS;DATABASE=Family members;Trusted_Connection=yes;"
    )
    cursor = connection.cursor()
    if search_query != '':
        query = ("SELECT * FROM [Family members] WHERE [First Name] LIKE ?")
        cursor.execute(query, ('%' + search_query + '%'))
        rows = cursor.fetchall()
        connection.close()


        # Convert rows to a list of dictionaries
        family_members = []
        for row in rows:
            member_dict = {}
            for idx, column in enumerate(cursor.description):
                member_dict[column[0]] = row[idx]
            family_members.append(member_dict)
        return jsonify(family_members)
    else:
        return jsonify([])
    
if __name__ == '__main__':
     app.run(host='127.0.0.1', port=5000)