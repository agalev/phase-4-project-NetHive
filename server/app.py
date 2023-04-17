#!/usr/bin/env python3

from flask import session, request
from flask_restful import Resource

from config import app, api, db

from models import User, Conversation, Room, RoomUser

class CheckAuth(Resource):
    def get(self):
        if 'user_id' in session:
            return {'user_id': session['user_id']}, 200
        return {'error': 'Not logged in'}, 401
    
class Signup(Resource):
    def post(self):
        req = request.get_json()
        if req:
            try:
                new_user = User(
                    first_name=req['first_name'],
                    last_name=req['last_name'],
                    email=req['email'],
                    image=req['image'] if 'image' in req else None
                )
                new_user.password_hash = req['password']
                db.session.add(new_user)
                db.session.commit()
                session['user_id'] = new_user.id
                return new_user.to_dict(only = ('id','first_name','last_name','email','image','is_online')), 201
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'No data provided'}, 400
    
class Login(Resource):
    def post(self):
        req = request.get_json()
        if req:
            try:
                user = User.query.filter(User.email == req['email']).first()
                if user and user.authenticate(req['password']):
                    session['user_id'] = user.id
                    user.is_online = True
                    db.session.commit()
                    return user.to_dict(only = ('id','first_name','last_name','email','image','is_online')), 200
                return {'error': 'Invalid credentials'}, 400
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'No data provided'}, 400
    
class Logout(Resource):
    def delete(self):
        if 'user_id' in session:
            user = User.query.filter(User.id == session['user_id']).first()
            user.is_online = False
            db.session.commit()
            session.pop('user_id')
            return {'success': 'Logged out'}, 200
        return {'error': 'Not logged in'}, 401
    
class GetUsers(Resource):
    def get(self):
        return [user.to_dict(only = ('id','first_name','last_name','email','image','is_online')) for user in User.query.all()], 200
    
class UsersControllerByID(Resource):
    def get(self, id):
        try:
            return User.query.filter(User.id == id).first().to_dict(only = ('id','first_name','last_name','email','image','is_online')), 200
        except:
            return {'error': 'User not found.'}, 400
    def patch(self, id):
        req = request.get_json()
        # check if user is logged in
        if req:
            try:
                user = User.query.filter(User.id == id).first()
                for attr in req:
                    setattr(user, attr, req[attr])
                db.session.commit()
                return user.to_dict(only = ('id','first_name','last_name','email','image')), 200
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'No data provided'}, 400
    def delete(self, id):
        # check if user is logged in and clear session after delete
        try:
            db.session.delete(User.query.filter(User.id == id).first())
            db.session.commit()
            return {'message': 'User deleted'}, 200
        except:
            return {'error': 'User not found'}, 400



api.add_resource(CheckAuth, '/check_auth')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(GetUsers, '/users')
api.add_resource(UsersControllerByID, '/users/<int:id>')
if __name__ == '__main__':
    app.run(port=5555, debug=True)