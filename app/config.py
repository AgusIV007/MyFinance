class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://user:@localhost:3306/myfinance'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your_secret_key'
    
    @staticmethod
    def print_db_uri():
        print(Config.SQLALCHEMY_DATABASE_URI)