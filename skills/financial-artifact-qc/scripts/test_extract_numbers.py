import sys
import unittest
from pathlib import Path


sys.dont_write_bytecode = True
sys.path.insert(0, str(Path(__file__).parent))
import extract_numbers


class ExtractNumbersTests(unittest.TestCase):
    def test_normalizes_money_units(self):
        values = extract_numbers.extract_numbers(
            "Revenue was $500M. Revenue was also reported as $0.5B."
        )

        self.assertEqual([item["normalized"] for item in values], [500_000_000, 500_000_000])

    def test_reports_conflicting_values_for_the_same_metric(self):
        findings = extract_numbers.find_conflicts(
            """## Slide 1
Revenue: $500M

## Slide 2
Revenue: $485M
"""
        )

        self.assertEqual(len(findings), 1)
        self.assertEqual(findings[0]["metric"], "revenue")
        self.assertEqual(findings[0]["slides"], [1, 2])


if __name__ == "__main__":
    unittest.main()
