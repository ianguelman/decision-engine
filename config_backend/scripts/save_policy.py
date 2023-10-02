import os
import sqlite3


def run(policy):

    try:
        conn = sqlite3.connect(os.environ["DB_PATH"])
        cursor = conn.cursor()

        cursor.execute(os.environ["DELETE_POLICIES_QUERY"])

        for rule in policy:
            cursor.execute(os.environ["INSERT_POLICY_QUERY"].format(format_value(rule["id"]),
                                                                    format_value(
                                                                        rule["type"]),
                                                                    format_value(
                                                                        rule["property_name"]),
                                                                    format_value(
                                                                        rule["comparison_type"]),
                                                                    format_value(
                                                                        rule["comparison_value"]),
                                                                    format_value(
                                                                        rule["on_true"]),
                                                                    format_value(
                                                                        rule["on_false"]),
                                                                    format_value(rule["return"])))

        cursor.close()
        conn.commit()
        conn.close()

        return True

    except Exception as e:
        return False


def format_value(value):
    if value is None:
        return 'NULL'
    elif isinstance(value, bool) or value == "true" or value == "false":
        return str(value).upper()
    else:
        return f"'{value}'"
