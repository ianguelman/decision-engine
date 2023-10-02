FROM python:3.11.0a5-alpine3.15

ENV FLASK_APP="index.py"

WORKDIR /usr/share/script

COPY . ./

RUN pip install -r requirements.txt

ENTRYPOINT ["python3", "-m", "flask", "run", "--host=0.0.0.0"]