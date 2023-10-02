FROM python:3.11.0a5-alpine3.15 AS builder

ENV FLASK_APP="index.py"

WORKDIR /usr/share/script

COPY . ./

WORKDIR /usr/share/tests

COPY . ./

RUN python3 -m unittest discover

FROM python:3.11.0a5-alpine3.15

ENV FLASK_APP="index.py"

WORKDIR /usr/share/script

COPY --from=builder /usr/share/script/ ./

RUN pip install -r requirements.txt

ENTRYPOINT ["python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=5001"]