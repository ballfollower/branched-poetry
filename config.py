class Config(object):
    SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
        username="ballfollower",
        password="{+@Np)$K8l",
        hostname="ballfollower.mysql.pythonanywhere-services.com",
        databasename="ballfollower$verses",
    )

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_POOL_RECYCLE = 299