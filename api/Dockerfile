FROM registry.opensource.zalan.do/stups/python:3.6.5-22

COPY Pipfile /
COPY Pipfile.lock /

RUN pipenv install --system --deploy --ignore-pipfile

COPY app.py /opt/
COPY test_app.py /opt/
COPY test_integration.py /opt/
COPY swagger.yaml /opt/

WORKDIR /opt/
CMD ./app.py
