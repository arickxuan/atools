import requests
from bs4 import BeautifulSoup

url = "https://m.muxtoo.com/"
response = requests.get(url)
html = response.content

soup = BeautifulSoup(html, 'html.parser')

p_tags = soup.find_all('div', class_='item')

print(p_tags)