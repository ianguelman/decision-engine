def run(nodes):
    policy = []

    for node in nodes:
        node_data = node["data"]
        node_type = node["type"]

        match(node_type):
            case "start":
                policy.append({"id": node["id"],
                               "type": node_type,
                               "property_name": None,
                               "comparison_type": None,
                               "comparison_value": None,
                               "on_true": node_data["onTrue"],
                               "on_false": None,
                               "return": None})
            case "decision":
                policy.append({"id": node["id"],
                               "type": node_type,
                               "property_name": node_data["propertyName"],
                               "comparison_type": node_data["comparisonValue"],
                               "comparison_value": node_data["comparedValue"],
                               "on_true": node_data["onTrue"],
                               "on_false": node_data["onFalse"],
                               "return": None})
            case "return":
                policy.append({"id": node["id"],
                               "type": node_type,
                               "property_name": None,
                               "comparison_type": None,
                               "comparison_value": None,
                               "on_true": None,
                               "on_false": None,
                               "return": node_data["returnValue"]})
            case _:
                raise ValueError(node_type)

    return policy
