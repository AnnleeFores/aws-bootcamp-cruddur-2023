from lib.db import db


class UsersShort:
    def run(handle):
        sql = db.template("users", "short")
        results = db.query_object_json(sql, {"handle": handle})
        if results is None:
            return {}
        else:
            return results
