from instabot import Bot
from dotenv import load_dotenv
load_dotenv()

import requests
import os
import sys
import json
account = os.environ.get("INSTAGRAM_USERNAME")
def donwnload_photo(media_id, filename):
    media = bot.get_media_info(media_id)[0]
    if ("image_versions2" in media.keys()):
        url = media["image_versions2"]["candidates"][0]["url"]
        response = requests.get(url)
        if "tmps1" not in os.listdir():
                os.mkdir("tmps1")
        with open("tmps1/" + filename + ".jpg", "wb") as f:
            response.raw.decode_content = True
            f.write(response.content)
    elif("carousel_media" in media.keys()):
        for e, element in enumerate(media["carousel_media"]):
            url = element['image_versions2']["candidates"][0]["url"]
            response = requests.get(url)
            if "tmps" not in os.listdir():
                os.mkdir("tmps")
            with open("tmps/" + filename + str(e) + ".jpg", "wb") as f:
                response.raw.decode_content = True
                f.write(response.content)
    return url
bot = Bot()
bot.login(username = os.environ.get("INSTAGRAM_USERNAME"),  password = os.environ.get("INSTAGRAM_PASSWORD"))
urls = dict()
print("--> Downloading photos")
twony_last_medias = bot.get_user_medias(account, filtration = None)
for e,media_id in enumerate(twony_last_medias):
        url = donwnload_photo(media_id, "img_" + str(e))
        urls[e] = url
print("--> Printing urls in file")
print(urls)
with open("urls_for_photos.json", "w+") as json_file:
        json.dump(urls, json_file)