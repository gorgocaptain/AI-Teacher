from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
 
tuition_data = {
    "Brock University": {
        "Computer Science": {
            "domestic": {
                "on-campus": "$8,200 - $11,000 CAD",
                "off-campus": "$7,200 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$30,500 - $37,000 CAD",
                "off-campus": "$27,500 - $34,000 CAD"
            }
        },
        "Mechanical Engineering": {
            "domestic": {
                "on-campus": "$8,400 - $11,000 CAD",
                "off-campus": "$7,400 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$31,000 - $37,000 CAD",
                "off-campus": "$28,000 - $34,000 CAD"
            }
        },
        "Life Sciences": {
            "domestic": {
                "on-campus": "$8,300 - $11,000 CAD",
                "off-campus": "$7,300 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$30,800 - $37,000 CAD",
                "off-campus": "$27,800 - $34,000 CAD"
            }
        },
        "Mathematics": {
            "domestic": {
                "on-campus": "$8,100 - $11,000 CAD",
                "off-campus": "$7,100 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$30,600 - $37,000 CAD",
                "off-campus": "$27,600 - $34,000 CAD"
            }
        },
        "Business Administration": {
            "domestic": {
                "on-campus": "$8,500 - $11,000 CAD",
                "off-campus": "$7,500 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$31,200 - $37,000 CAD",
                "off-campus": "$28,200 - $34,000 CAD"
            }
        },
        "Economics": {
            "domestic": {
                "on-campus": "$8,400 - $11,000 CAD",
                "off-campus": "$7,400 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$30,900 - $37,000 CAD",
                "off-campus": "$27,900 - $34,000 CAD"
            }
        },
        "Physics": {
            "domestic": {
                "on-campus": "$8,200 - $11,000 CAD",
                "off-campus": "$7,200 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$31,100 - $37,000 CAD",
                "off-campus": "$28,100 - $34,000 CAD"
            }
        },
        "Computer Engineering": {
            "domestic": {
                "on-campus": "$8,300 - $11,000 CAD",
                "off-campus": "$7,300 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$31,000 - $37,000 CAD",
                "off-campus": "$28,000 - $34,000 CAD"
            }
        },
        "Health Sciences": {
            "domestic": {
                "on-campus": "$8,400 - $11,000 CAD",
                "off-campus": "$7,400 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$30,700 - $37,000 CAD",
                "off-campus": "$27,700 - $34,000 CAD"
            }
        },
        "Finance": {
            "domestic": {
                "on-campus": "$8,500 - $11,000 CAD",
                "off-campus": "$7,500 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$31,300 - $37,000 CAD",
                "off-campus": "$28,300 - $34,000 CAD"
            }
        }
    },
    "Wilfrid Laurier University": {
        "Computer Science": {
            "domestic": {
                "on-campus": "$8,300 - $11,000 CAD",
                "off-campus": "$7,300 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$30,800 - $37,000 CAD",
                "off-campus": "$27,800 - $34,000 CAD"
            }
        },
        "Mechanical Engineering": {
            "domestic": {
                "on-campus": "$8,500 - $11,000 CAD",
                "off-campus": "$7,500 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$31,200 - $37,000 CAD",
                "off-campus": "$28,200 - $34,000 CAD"
            }
        },
        "Life Sciences": {
            "domestic": {
                "on-campus": "$8,400 - $11,000 CAD",
                "off-campus": "$7,400 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$30,900 - $37,000 CAD",
                "off-campus": "$27,900 - $34,000 CAD"
            }
        },
        "Mathematics": {
            "domestic": {
                "on-campus": "$8,200 - $11,000 CAD",
                "off-campus": "$7,200 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$30,600 - $37,000 CAD",
                "off-campus": "$27,600 - $34,000 CAD"
            }
        },
        "Business Administration": {
            "domestic": {
                "on-campus": "$8,600 - $11,000 CAD",
                "off-campus": "$7,600 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$31,300 - $37,000 CAD",
                "off-campus": "$28,300 - $34,000 CAD"
            }
        },
        "Economics": {
            "domestic": {
                "on-campus": "$8,500 - $11,000 CAD",
                "off-campus": "$7,500 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$31,000 - $37,000 CAD",
                "off-campus": "$28,000 - $34,000 CAD"
            }
        },
        "Physics": {
            "domestic": {
                "on-campus": "$8,300 - $11,000 CAD",
                "off-campus": "$7,300 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$30,700 - $37,000 CAD",
                "off-campus": "$27,700 - $34,000 CAD"
            }
        },
        "Computer Engineering": {
            "domestic": {
                "on-campus": "$8,400 - $11,000 CAD",
                "off-campus": "$7,400 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$31,100 - $37,000 CAD",
                "off-campus": "$28,100 - $34,000 CAD"
            }
        },
        "Health Sciences": {
            "domestic": {
                "on-campus": "$8,500 - $11,000 CAD",
                "off-campus": "$7,500 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$30,900 - $37,000 CAD",
                "off-campus": "$27,900 - $34,000 CAD"
            }
        },
        "Finance": {
            "domestic": {
                "on-campus": "$8,600 - $11,000 CAD",
                "off-campus": "$7,600 - $10,000 CAD"
            },
            "international": {
                "on-campus": "$31,400 - $37,000 CAD",
                "off-campus": "$28,400 - $34,000 CAD"
            }
        }
    },
    "University of Toronto": {
        "Computer Science": {
            "domestic": {
                "on-campus": "$14,000 - $19,500 CAD",
                "off-campus": "$12,000 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,000 - $70,000 CAD",
                "off-campus": "$61,000 - $65,000 CAD"
            }
        },
        "Mechanical Engineering": {
            "domestic": {
                "on-campus": "$14,200 - $19,500 CAD",
                "off-campus": "$12,200 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,500 - $70,000 CAD",
                "off-campus": "$61,500 - $65,000 CAD"
            }
        },
        "Life Sciences": {
            "domestic": {
                "on-campus": "$14,100 - $19,500 CAD",
                "off-campus": "$12,100 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,200 - $70,000 CAD",
                "off-campus": "$61,200 - $65,000 CAD"
            }
        },
        "Mathematics": {
            "domestic": {
                "on-campus": "$13,900 - $19,500 CAD",
                "off-campus": "$11,900 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$65,800 - $70,000 CAD",
                "off-campus": "$60,800 - $65,000 CAD"
            }
        },
        "Business Administration": {
            "domestic": {
                "on-campus": "$14,500 - $19,500 CAD",
                "off-campus": "$12,500 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,800 - $70,000 CAD",
                "off-campus": "$61,800 - $65,000 CAD"
            }
        },
        "Economics": {
            "domestic": {
                "on-campus": "$14,200 - $19,500 CAD",
                "off-campus": "$12,200 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,000 - $70,000 CAD",
                "off-campus": "$61,000 - $65,000 CAD"
            }
        },
        "Physics": {
            "domestic": {
                "on-campus": "$14,000 - $19,500 CAD",
                "off-campus": "$12,000 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,400 - $70,000 CAD",
                "off-campus": "$61,400 - $65,000 CAD"
            }
        },
        "Computer Engineering": {
            "domestic": {
                "on-campus": "$14,300 - $19,500 CAD",
                "off-campus": "$12,300 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,600 - $70,000 CAD",
                "off-campus": "$61,600 - $65,000 CAD"
            }
        },
        "Health Sciences": {
            "domestic": {
                "on-campus": "$14,400 - $19,500 CAD",
                "off-campus": "$12,400 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,200 - $70,000 CAD",
                "off-campus": "$61,200 - $65,000 CAD"
            }
        },
        "Finance": {
            "domestic": {
                "on-campus": "$14,600 - $19,500 CAD",
                "off-campus": "$12,600 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,700 - $70,000 CAD",
                "off-campus": "$61,700 - $65,000 CAD"
            }
        }
    },
    "University of Waterloo": { 
        "Computer Science": {
            "domestic": {
                "on-campus": "$14,200 - $19,500 CAD",
                "off-campus": "$12,200 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,000 - $70,000 CAD",
                "off-campus": "$61,000 - $65,000 CAD"
            }
        },
        "Mechanical Engineering": { 
            "domestic": {
                "on-campus": "$14,400 - $19,500 CAD",
                "off-campus": "$12,400 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,500 - $70,000 CAD",
                "off-campus": "$61,500 - $65,000 CAD"
            }
        },
        "Life Sciences": {
            "domestic": {
                "on-campus": "$14,300 - $19,500 CAD",
                "off-campus": "$12,300 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,200 - $70,000 CAD",
                "off-campus": "$61,200 - $65,000 CAD"
            }
        },
        "Mathematics": {
            "domestic": {
                "on-campus": "$14,000 - $19,500 CAD",
                "off-campus": "$12,000 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,100 - $70,000 CAD",
                "off-campus": "$61,100 - $65,000 CAD"
            }
        },
        "Business Administration": {
            "domestic": {
                "on-campus": "$14,600 - $19,500 CAD",
                "off-campus": "$12,600 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,800 - $70,000 CAD",
                "off-campus": "$61,800 - $65,000 CAD"
            }
        },
        "Economics": {
            "domestic": {
                "on-campus": "$14,400 - $19,500 CAD",
                "off-campus": "$12,400 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,300 - $70,000 CAD",
                "off-campus": "$61,300 - $65,000 CAD"
            }
        },
        "Physics": {
            "domestic": {
                "on-campus": "$14,200 - $19,500 CAD",
                "off-campus": "$12,200 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,400 - $70,000 CAD",
                "off-campus": "$61,400 - $65,000 CAD"
            }
        },
        "Computer Engineering": {
            "domestic": {
                "on-campus": "$14,500 - $19,500 CAD",
                "off-campus": "$12,500 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,600 - $70,000 CAD",
                "off-campus": "$61,600 - $65,000 CAD"
            }
        },
        "Health Sciences": {
            "domestic": {
                "on-campus": "$14,600 - $19,500 CAD",
                "off-campus": "$12,600 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,300 - $70,000 CAD",
                "off-campus": "$61,300 - $65,000 CAD"
            }
        },
        "Finance": {
            "domestic": {
                "on-campus": "$14,700 - $19,500 CAD",
                "off-campus": "$12,700 - $17,500 CAD"
            },
            "international": {
                "on-campus": "$66,800 - $70,000 CAD",
                "off-campus": "$61,800 - $65,000 CAD"
            }
        }
    },
    "York University": {
        "Computer Science": {
            "domestic": {
                "on-campus": "$8,500 - $15,000 CAD",
                "off-campus": "$7,500 - $14,000 CAD"
            },
            "international": {
                "on-campus": "$34,500 - $50,000 CAD",
                "off-campus": "$31,500 - $47,000 CAD"
            }
        },
        "Mechanical Engineering": {
            "domestic": {
                "on-campus": "$8,700 - $15,000 CAD",
                "off-campus": "$7,700 - $14,000 CAD"
            },
            "international": {
                "on-campus": "$34,800 - $50,000 CAD",
                "off-campus": "$31,800 - $47,000 CAD"
            }
        },
        "Life Sciences": {
            "domestic": {
                "on-campus": "$8,600 - $15,000 CAD",
                "off-campus": "$7,600 - $14,000 CAD"
            },
            "international": {
                "on-campus": "$34,700 - $50,000 CAD",
                "off-campus": "$31,700 - $47,000 CAD"
            }
        },
        "Mathematics": {
            "domestic": {
                "on-campus": "$8,400 - $15,000 CAD",
                "off-campus": "$7,400 - $14,000 CAD"
            },
            "international": {
                "on-campus": "$34,400 - $50,000 CAD",
                "off-campus": "$31,400 - $47,000 CAD"
            }
        },
        "Business Administration": {
            "domestic": {
                "on-campus": "$8,800 - $15,000 CAD",
                "off-campus": "$7,800 - $14,000 CAD"
            },
            "international": {
                "on-campus": "$35,000 - $50,000 CAD",
                "off-campus": "$32,000 - $47,000 CAD"
            }
        },
        "Economics": {
            "domestic": {
                "on-campus": "$8,700 - $15,000 CAD",
                "off-campus": "$7,700 - $14,000 CAD"
            },
            "international": {
                "on-campus": "$34,600 - $50,000 CAD",
                "off-campus": "$31,600 - $47,000 CAD"
            }
        },
        "Physics": {
            "domestic": {
                "on-campus": "$8,500 - $15,000 CAD",
                "off-campus": "$7,500 - $14,000 CAD"
            },
            "international": {
                "on-campus": "$34,800 - $50,000 CAD",
                "off-campus": "$31,800 - $47,000 CAD"
            }
        },
        "Computer Engineering": {
            "domestic": {
                "on-campus": "$8,600 - $15,000 CAD",
                "off-campus": "$7,600 - $14,000 CAD"
            },
            "international": {
                "on-campus": "$34,900 - $50,000 CAD",
                "off-campus": "$31,900 - $47,000 CAD"
            }
        },
        "Health Sciences": {
            "domestic": {
                "on-campus": "$8,700 - $15,000 CAD",
                "off-campus": "$7,700 - $14,000 CAD"
            },
            "international": {
                "on-campus": "$34,600 - $50,000 CAD",
                "off-campus": "$31,600 - $47,000 CAD"
            }
        },
        "Finance": {
            "domestic": {
                "on-campus": "$8,800 - $15,000 CAD",
                "off-campus": "$7,800 - $14,000 CAD"
            },
            "international": {
                "on-campus": "$35,100 - $50,000 CAD",
                "off-campus": "$32,100 - $47,000 CAD"
            }
        }
    }
}

@app.route('/find_best_match', methods=['POST'])
def find_best_match_route():
    data = request.json
    university = data.get('university')
    program = data.get('program')
    residence = data.get('residence')
    student_type = data.get('studentType')
    print(residence,student_type)

    if university in tuition_data:
        programs = tuition_data[university]
        print(programs)
        if program in programs:
            print('yes')
            info = programs[program]
            if student_type in info:
                print('yess')
                new = info[student_type]
                if residence in new:
                    print('yesss')
                    print(new[residence])
                    print('yessss')
                    return jsonify(new[residence])

    return jsonify("No data available for the selected options.")

if __name__ == '__main__':
    app.run(port=5001, debug=True)
