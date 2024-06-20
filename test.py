import unittest
from app import create_app

class ExampleTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_get_example(self):
        response = self.client.get('/example')
        self.assertEqual(response.status_code, 200)
        self.assertIn('example data', response.get_json()['data'])

if __name__ == '__main__':
    unittest.main()