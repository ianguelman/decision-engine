import unittest
from scripts.decision import run as decide, compare_values


class TestDecision(unittest.TestCase):

    def test_compare_values_equal(self):
        self.assertTrue(compare_values(5, "==", "5"))
        self.assertFalse(compare_values(5, "==", "10"))

    def test_compare_values_less_than(self):
        self.assertTrue(compare_values(5, "<", "10"))
        self.assertFalse(compare_values(10, "<", "5"))

    def test_compare_values_less_than_or_equal(self):
        self.assertTrue(compare_values(5, "<=", "5"))
        self.assertTrue(compare_values(5, "<=", "10"))
        self.assertFalse(compare_values(10, "<=", "5"))

    def test_compare_values_greater_than(self):
        self.assertTrue(compare_values(10, ">", "5"))
        self.assertFalse(compare_values(5, ">", "10"))

    def test_compare_values_greater_than_or_equal(self):
        self.assertTrue(compare_values(10, ">=", "10"))
        self.assertTrue(compare_values(10, ">=", "5"))
        self.assertFalse(compare_values(5, ">=", "10"))

    def test_compare_values_raise_value_error(self):
        with self.assertRaises(ValueError):
            compare_values(5, "+", 10)

    def test_decide_return_true(self):
        policy = [
            ["70908bb2-311b-4de4-a7fc-114115f53036", "start", None, None,
                None, "8836090d-70b7-411f-b124-fd486c71e2df", None, None],
            ["8836090d-70b7-411f-b124-fd486c71e2df", "decision", "test", ">", 10,
                "3fc0c29f-cd03-4f9a-8ab2-576b3b05a54f", "068e2588-9c2c-4a2e-887b-121ee80f0809", None],
            ["3fc0c29f-cd03-4f9a-8ab2-576b3b05a54f",
                "return", None, None, None, None, None, True],
            ["068e2588-9c2c-4a2e-887b-121ee80f0809", "return",
                None, None, None, None, None, False],
        ]
        request = {"test": 11}

        self.assertTrue(decide(policy, request))

    def test_decide_return_false(self):
        policy = [
           ["70908bb2-311b-4de4-a7fc-114115f53036", "start", None, None,
                None, "8836090d-70b7-411f-b124-fd486c71e2df", None, None],
            ["8836090d-70b7-411f-b124-fd486c71e2df", "decision", "test", "<=", 10,
                "3fc0c29f-cd03-4f9a-8ab2-576b3b05a54f", "068e2588-9c2c-4a2e-887b-121ee80f0809", None],
            ["3fc0c29f-cd03-4f9a-8ab2-576b3b05a54f",
                "return", None, None, None, None, None, True],
            ["068e2588-9c2c-4a2e-887b-121ee80f0809", "return",
                None, None, None, None, None, False],
        ]
        request = {"test": 10.1}

        self.assertFalse(decide(policy, request))

    def test_decide_raise_key_error(self):
        policy = [
           ["70908bb2-311b-4de4-a7fc-114115f53036", "start", None, None,
                None, "8836090d-70b7-411f-b124-fd486c71e2df", None, None],
            ["8836090d-70b7-411f-b124-fd486c71e2df", "decision", "test", ">", 10,
                "3fc0c29f-cd03-4f9a-8ab2-576b3b05a54f", "068e2588-9c2c-4a2e-887b-121ee80f0809", None],
            ["3fc0c29f-cd03-4f9a-8ab2-576b3b05a54f",
                "return", None, None, None, None, None, True],
            ["068e2588-9c2c-4a2e-887b-121ee80f0809", "return",
                None, None, None, None, None, False],
        ]
        request = {}

        with self.assertRaises(KeyError):
            decide(policy, request)


if __name__ == '__main__':
    unittest.main()
