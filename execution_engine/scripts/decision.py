type_index = 1
property_name_index = 2
comparison_type_index = 3
comparison_value_index = 4
on_true_index = 5
on_false_index = 6
return_index = 7

index_map = {}


def run(policy, request):
    map_index_by_id(policy)
    return bool(int(decision(policy, request, find_index_of_start(policy))))


def decision(policy, request, i):
    if policy[i][type_index] == "return":
        return policy[i][return_index]

    if policy[i][type_index] == "start" or compare_values(request[policy[i][property_name_index]], policy[i][comparison_type_index], policy[i][comparison_value_index]):
        return decision(policy, request, index_map[policy[i][on_true_index]])

    return decision(policy, request, index_map[policy[i][on_false_index]])


def compare_values(val1, operand, val2):
    match operand:
        case "==":
            return val1 == float(val2)
        case "<":
            return val1 < float(val2)
        case "<=":
            return val1 <= float(val2)
        case ">":
            return val1 > float(val2)
        case ">=":
            return val1 >= float(val2)
        case _:
            raise ValueError(f"Invalid operand on database: {operand}")


def map_index_by_id(data):
    global index_map
    for index, item in enumerate(data):
        if item[0] not in index_map:
            index_map[item[0]] = index


def find_index_of_start(data):
    for index, item in enumerate(data):
        if len(item) > 1 and item[1] == "start":
            return index
    raise ValueError(f"Start rule not found on database")
