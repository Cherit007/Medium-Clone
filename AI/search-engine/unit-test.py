import unittest
import json
from engine import app  

class TestYourFlaskApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_search_endpoint(self):
        keyword = {"keyword": "python"}
        response = self.app.post('/search', json=keyword)
        data = json.loads(response.data.decode('utf-8'))

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, list)

    def test_add_article_endpoint(self):
        article_data = {"title": "New Article", "article_id": "123"}
        response = self.app.post('/add-article-elastic-search', json=article_data)
        result = response.data.decode('utf-8')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(result, "success")

    def test_invalid_data_add_article_endpoint(self):
        invalid_article_data = {"title": "Testing title"}
        response = self.app.post('/add-article-elastic-search', json=invalid_article_data)
        result = response.data.decode('utf-8')

        self.assertEqual(response.status_code, 500)


if __name__ == '__main__':
    unittest.main()
