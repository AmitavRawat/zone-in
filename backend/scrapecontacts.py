import requests
from bs4 import BeautifulSoup

# The URL of the page you want to scrape
url = 'https://www.houzz.com/professionals/design-build/evanston-il-us-probr0-bo~t_11793~r_4891382'

# Send a GET request to the page
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content of the page into a BeautifulSoup object
    soup = BeautifulSoup(response.content, 'html.parser')

    # Now you can use BeautifulSoup to find the elements that contain the data you're interested in.
    # This is a placeholder example to find contractor names. You'll need to inspect the HTML and update the selectors accordingly.
    contractor_names = soup.find_all('div', class_='contractor-name-class')  # Update the class based on actual HTML

    for name in contractor_names:
        print(name.text.strip())

    # Similarly, you can find elements for specialties, reviews, and booking information.
    # Remember that the class names and structure of the HTML will dictate how you need to extract the information.
else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
