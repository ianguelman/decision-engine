type_index = 1
property_name_index = 2
comparison_type_index = 3
comparison_value_index = 4
on_true_index = 5
on_false_index = 6
return_index = 7

def run(policy, request):
    return bool(decision(policy, request, 0))

def decision(policy, request, i):
    if policy[i][type_index] == "return":
        return policy[i][return_index]
    
    if compare_values(request[policy[i][property_name_index]], policy[i][comparison_type_index], policy[i][comparison_value_index]):
        return decision(policy, request, policy[i][on_true_index])

    return decision(policy, request, policy[i][on_false_index])

def compare_values(val1, operand, val2):
    match operand:
        case "==":
            return val1 == val2
        case "<":
            return val1 < val2
        case "<=":
            return val1 <= val2
        case ">":
            return val1 > val2
        case ">=":
            return val1 >= val2
        case _:
            raise ValueError(operand)