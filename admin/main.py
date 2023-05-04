import os
import firebase_admin
from firebase_admin import credentials, auth, firestore, storage

cred = credentials.Certificate("./service_account_key.json")
firebase_admin.initialize_app(cred, {'storageBucket': 'YOUR STORAGE BUCKET'})

ROOT = "transfer"

user_ids = []
user_list = auth.list_users()
for user in user_list.users:
    user_ids.append(user.uid)

user_names = dict()
client = firestore.client()
for uid in user_ids:
    user_ref = client.collection('user').document(uid)
    user_doc = user_ref.get()
    if user_doc.exists:
        user_data = user_doc.to_dict()
        if user_data.get('name'):
            user_names.update({uid: user_data.get('name')})

bucket = storage.bucket()
data = ""
for uid in user_ids:
    blob = bucket.blob(f'{uid}/{uid}')

    if blob.exists():
        user_ref = client.collection('user').document(uid)
        user_doc = user_ref.get()

        if user_doc.exists:
            user_data = user_doc.to_dict()

            # if user_data.get('regName') is None:
            #     data += f"{user_data.get('name')} -> {user_data.get('regNo')} -> {user_data.get('rollNo')}\n"
            # else:
            #     data += f"{user_data.get('regName')} -> {user_data.get('regNo')} -> {user_data.get('rollNo')}\n"

            storage_path = f'{ROOT}/{user_data.get("name")}'
            if not os.path.exists(storage_path):
                os.makedirs(storage_path)
            
            with open(f"{storage_path}/info.txt", 'w') as file:
                file.write(f"name = {user_data.get('regName')}\n")
                file.write(f"dept = {user_data.get('branch')} {user_data.get('year')}\n")
                file.write(f"registration number = {user_data.get('regName')}\n")
                file.write(f"roll number = {user_data.get('rollNo')}\n")

            blob.download_to_filename(f"{ROOT}/{user_names.get(uid)}/{user_names.get(uid)}.jpg")
