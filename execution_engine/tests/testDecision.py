import unittest
from scripts.decision import run as decide, compare_values


class TestDecision(unittest.TestCase):

    def test_compare_values_equal(self):
        self.assertTrue(compare_values(5, "==", 5))
        self.assertFalse(compare_values(5, "==", 10))

    def test_compare_values_less_than(self):
        self.assertTrue(compare_values(5, "<", 10))
        self.assertFalse(compare_values(10, "<", 5))

    def test_compare_values_less_than_or_equal(self):
        self.assertTrue(compare_values(5, "<=", 5))
        self.assertTrue(compare_values(5, "<=", 10))
        self.assertFalse(compare_values(10, "<=", 5))

    def test_compare_values_greater_than(self):
        self.assertTrue(compare_values(10, ">", 5))
        self.assertFalse(compare_values(5, ">", 10))

    def test_compare_values_greater_than_or_equal(self):
        self.assertTrue(compare_values(10, ">=", 10))
        self.assertTrue(compare_values(10, ">=", 5))
        self.assertFalse(compare_values(5, ">=", 10))

    def test_compare_values_raise_value_error(self):
        with self.assertRaises(ValueError):
            compare_values(5, "+", 10)

    def test_decide_return_true(self):
        policy = [
            [0, "decision", "test", ">", 10, 1, 2, None],
            [1, "return", None, None, None, None, None, True],
            [2, "return", None, None, None, None, None, False],
        ]
        request = {"test": 11}

        self.assertTrue(decide(policy, request))

    def test_decide_return_false(self):
        policy = [
            [0, "decision", "test", "<", 10, 1, 2, None],
            [1, "return", None, None, None, None, None, True],
            [2, "return", None, None, None, None, None, False],
        ]
        request = {"test": 11}

        self.assertFalse(decide(policy, request))

    def test_decide_raise_key_error(self):
        policy = [
            [0, "decision", "test", "<", 10, 1, 2, None],
            [1, "return", None, None, None, None, None, True],
            [2, "return", None, None, None, None, None, False],
        ]
        request = {}

        with self.assertRaises(KeyError):
            decide(policy, request)


if __name__ == '__main__':
    unittest.main()