import unittest
from scripts.process_flow import run as process_flow


class TestProcess_flowFunction(unittest.TestCase):
    def test_process_flow_start_node(self):
        nodes = [{"id": 1, "type": "start", "data": {"onTrue": 2}}]
        policy = process_flow(nodes)
        self.assertEqual(len(policy), 1)
        self.assertEqual(policy[0]["type"], "start")
        self.assertEqual(policy[0]["on_true"], 2)

    def test_process_flow_decision_node(self):
        nodes = [{"id": 1, "type": "decision", "data": {"propertyName": "age",
                                                        "comparisonValue": ">", "comparedValue": 18, "onTrue": 2, "onFalse": 3}}]
        policy = process_flow(nodes)
        self.assertEqual(len(policy), 1)
        self.assertEqual(policy[0]["type"], "decision")
        self.assertEqual(policy[0]["property_name"], "age")
        self.assertEqual(policy[0]["comparison_type"], ">")
        self.assertEqual(policy[0]["comparison_value"], 18)
        self.assertEqual(policy[0]["on_true"], 2)
        self.assertEqual(policy[0]["on_false"], 3)

    def test_process_flow_return_node(self):
        nodes = [{"id": 1, "type": "return",
                  "data": {"returnValue": "allowed"}}]
        policy = process_flow(nodes)
        self.assertEqual(len(policy), 1)
        self.assertEqual(policy[0]["type"], "return")
        self.assertEqual(policy[0]["return"], "allowed")

    def test_process_flow_invalid_node_type(self):
        nodes = [{"id": 1, "type": "invalid_type",
                  "data": {"someData": "value"}}]
        with self.assertRaises(ValueError):
            process_flow(nodes)


if __name__ == '__main__':
    unittest.main()
