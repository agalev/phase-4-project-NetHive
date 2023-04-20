#!/usr/bin/env python3

from flask import session, request
from flask_restful import Resource
from werkzeug.utils import secure_filename
import uuid as uuid
import os

from config import app, api, db, socketio

from models import User, Conversation, Room, RoomUser

@app.before_request
def before_request():
    if 'user_id' not in session and request.endpoint not in ['login', 'signup']:
        return {'error': 'Not logged in'}, 401

class CheckAuth(Resource):
    def get(self):
        if 'user_id' in session:
            return User.query.filter(User.id == session['user_id']).first().to_dict(only = ('id','first_name','last_name','email','image','is_online')), 200
        return {'error': 'Not logged in'}, 401
    
class Signup(Resource):
    def post(self):
        req = request.form.to_dict()
        image = request.files.get('image')
        print(req)
        print(request.files)
        if req:
            try:
                pic_filename = secure_filename(image.filename)
                pic_name = str(uuid.uuid1()) + "_" + pic_filename
                print(pic_name)
                image.save(os.path.join(app.config['UPLOAD_FOLDER'],pic_name))
                print('hello')
                new_user = User(
                    first_name=req['first_name'],
                    last_name=req['last_name'],
                    email=req['email'],
                    is_online=True,
                    image=pic_name
                )
                print(new_user)
                new_user.password_hash = req['password']
                db.session.add(new_user)
                db.session.commit()
                session['user_id'] = new_user.id
                return new_user.to_dict(only=('id', 'first_name', 'last_name', 'email', 'image', 'is_online')), 201
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
                    return user.to_dict(only = ('id','first_name','last_name','email','image','is_online', 'rooms')), 200
                return {'error': 'Invalid credentials'}, 400
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'No data provided'}, 400
    
class Logout(Resource):
    def post(self):
            user = User.query.filter(User.id == session['user_id']).first()
            user.is_online = False
            db.session.commit()
            session.pop('user_id')
            return {'success': 'Logged out'}, 200
    
class GetUsers(Resource):
    def get(self):
        return [user.to_dict(only = ('id','first_name','last_name','email','image','is_online',)) for user in User.query.all()], 200
    
class UsersControllerByID(Resource):
    def get(self, id):
        try:
            return User.query.filter(User.id == id).first().to_dict(only = ('id','first_name','last_name','email','image','is_online','rooms.room')), 200
        except:
            return {'error': 'User not found.'}, 400
    def patch(self, id):
        req = request.get_json()
        if session['user_id'] == id:
            try:
                user = User.query.filter(User.id == id).first()
                for attr in req:
                    setattr(user, attr, req[attr])
                db.session.commit()
                return user.to_dict(only = ('id','first_name','last_name','email','image')), 200
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'Not authorized'}, 401
    def delete(self, id):
        # check if user is logged in and clear session after delete
        try:
            db.session.delete(User.query.filter(User.id == id).first())
            db.session.commit()
            session['user_id'] = None
            return {'message': 'User deleted'}, 200
        except:
            return {'error': 'User not found'}, 400

class RoomsController(Resource):
    def post(self):
        req = request.get_json()
        if req:
            try:
                new_room = Room(
                    topic=req['topic']
                )
                db.session.add(new_room)
                db.session.commit()
                return new_room.to_dict(only = ('id','topic')), 201
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'No data provided'}, 400
    def get(self):
        return [room.to_dict(only = ('id','topic')) for room in Room.query.all()], 200

class RoomsControllerByID(Resource):
    def get(self, id):
        try:
            return Room.query.filter(Room.id == id).first().to_dict(only = ('id','topic','members','users.user')), 200
        except:
            return {'error': 'Room not found.'}, 400
    def patch(self, id):
        try:
            room = Room.query.filter(Room.id == id).first()
            user = User.query.filter(User.id == session['user_id']).first()
            new_room_user = RoomUser(
                room_id=room.id,
                user_id=user.id
            )
            if RoomUser.query.filter(RoomUser.room_id == room.id, RoomUser.user_id == user.id).first():
                return {'error': 'Already joined room.'}, 400
            else:
                room.members += 1
                db.session.add(room)
                db.session.add(new_room_user)
                db.session.commit()
                return [user.to_dict(only = ('id', 'rooms'))], 200
        except Exception as e:
            return {'error': str(e)}, 400
    def delete(self, id):
        try:
            room = Room.query.filter(Room.id == id).first()
            user = User.query.filter(User.id == session['user_id']).first()
            room_user = RoomUser.query.filter(RoomUser.room_id == room.id, RoomUser.user_id == user.id).first()
            room.members -= 1
            db.session.add(room)
            db.session.delete(room_user)
            db.session.commit()
            return {'message': 'Left Room.'}, 200
        except Exception as e:
            return {'error': str(e)}, 400

class ConversationController(Resource):
    def post(self):
        req = request.get_json()
        if req:
            try:
                new_conversation = Conversation(
                    sender_id=session['user_id'],
                    receiver_id=req['receiver_id'] if 'receiver_id' in req else None,
                    room_id=req['room_id'] if 'room_id' in req else None,
                    message=req['message']
                )
                db.session.add(new_conversation)
                db.session.commit()
                return new_conversation.to_dict(), 201
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'No data provided'}, 400
    def get(self):
        return [conversation.to_dict() for conversation in Conversation.query.all()], 200
    def patch(self):
        req = request.get_json()
        if req:
            try:
                conversation = Conversation.query.filter(Conversation.id == req['id']).first()
                for attr in req:
                    setattr(conversation, attr, req[attr])
                db.session.commit()
                return conversation.to_dict(), 200
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'No data provided'}, 400
    def delete(self):
        req = request.get_json()
        if req:
            try:
                db.session.delete(Conversation.query.filter(Conversation.id == req['id']).first())
                db.session.commit()
                return {'message': 'Message deleted'}, 200
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'No data provided'}, 400

class QueryMessages(Resource):
    def get(self, id):
        try:
            query = Conversation.query.filter(Conversation.sender_id == session['user_id'], Conversation.receiver_id == id).all()
            query += Conversation.query.filter(Conversation.sender_id == id, Conversation.receiver_id == session['user_id']).all()
            query.sort(key=lambda x: x.created_at)
            return [conversation.to_dict() for conversation in query], 200
            # return [conversation.to_dict() for conversation in Conversation.query.filter(Conversation.sender_id == session['user_id'], Conversation.receiver_id == id).all()], 200
        except Exception as e:
            return {'error': str(e)}, 400
    
api.add_resource(CheckAuth, '/check_auth')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(GetUsers, '/users')
api.add_resource(UsersControllerByID, '/users/<int:id>')
api.add_resource(RoomsController, '/rooms')
api.add_resource(RoomsControllerByID, '/rooms/<int:id>')
api.add_resource(ConversationController, '/conversations')
api.add_resource(QueryMessages, '/messages/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)