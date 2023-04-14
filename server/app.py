#!/usr/bin/env python3

from flask import session, request
from flask_restful import Resource

from config import app, api, db

from models import db, User, Conversation, Room, RoomUser

class UsersController(Resource):
    def get(self):
        return [user.to_dict() for user in User.query.all()], 200
    def post(self):
        data = request.get_json()
        if data:
            try:
                new_user = User(
                    first_name=data['first_name'],
                    last_name=data['last_name'],
                    email=data['email'],
                    image=data['image']
                )
                new_user.password_hash = data['password']
                db.session.add(new_user)
                db.session.commit()
                return new_user.to_dict(), 201
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'No data provided'}, 400
class UsersControllerByID(Resource):
    def get(self, id):
        try:
            return User.query.get(id).to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 400
    def patch(self, id):
        data = request.get_json()
        if data:
            try:
                user = User.query.get(id)
                user.first_name = data['first_name']
                user.last_name = data['last_name']
                user.email = data['email']
                user.image = data['image']
                db.session.commit()
                return user.to_dict(), 200
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'No data provided'}, 400
    def delete(self, id):
        try:
            user = User.query.get(id)
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted'}, 200
        except Exception as e:
            return {'error': str(e)}, 400

api.add_resource(UsersController, '/users')
api.add_resource(UsersControllerByID, '/users/<int:id>')
if __name__ == '__main__':
    app.run(port=5555, debug=True)