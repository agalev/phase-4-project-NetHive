from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
import re

from config import bcrypt, db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-room_users.user',)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    is_online = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    rooms = db.relationship('RoomUser', backref='user', cascade='all, delete, delete-orphan')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        if len(password) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not re.search('[A-Z]', password):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search('[a-z]', password):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search('[0-9]', password):
            raise ValueError('Password must contain at least one digit')
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('email')
    def validate_email(self, key, email):
        existing_user = User.query.filter(User.email == email).first()
        if existing_user and existing_user.id != self.id:
            raise ValueError('Email address already registered')
        return email
    


class Conversation(db.Model, SerializerMixin):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    sender = db.relationship('User', foreign_keys=[sender_id])
    receiver = db.relationship('User', foreign_keys=[receiver_id])
    
class Room(db.Model, SerializerMixin):
    __tablename__ = 'rooms'

    serialize_rules = ('-room_users.room',)

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String)
    members = db.Column(db.Integer, default=0)
    votes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    users = db.relationship('RoomUser', backref='room', cascade='all, delete, delete-orphan')

    @validates('topic')
    def validate_topic(self, key, topic):
        if len(topic) < 3 or len(topic) > 20:
            raise ValueError('Topic must be between 3 and 20 characters long.')
        return topic

class RoomUser(db.Model, SerializerMixin):
    __tablename__ = 'room_users'

    serialize_rules = ('-room.users', '-user.rooms',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'))

