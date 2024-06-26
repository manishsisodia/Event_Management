FROM python:3-slim
ENV PYTHONUNBUFFERED 1

WORKDIR /app
# requirements.txt should be present in the same directory from we run docker build command
COPY requirements.txt .

RUN apt-get update -y && \
	apt-get upgrade -y && \
	apt-get install -y vim && \
    apt-get install -y libpq-dev && \
    apt-get install -y python3-dev && \
    apt-get install -y gcc && \
	pip install -r requirements.txt --no-cache-dir && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*
	
# Copy all file from context to /app directory	
COPY . .


ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

CMD wait-for-it -t 30 db:5432 -- \python3 manage.py makemigrations && \
    python3 manage.py migrate && \
    python3 manage.py collectstatic --noinput && \
    python manage.py runserver 0.0.0.0:8000




# FROM python:3-slim

# ENV PYTHONUNBUFFERED 1

# WORKDIR /app

# # Copy requirements.txt first to leverage Docker caching
# COPY requirements.txt .

# # Install system dependencies and Python packages
# RUN apt-get update -y && \
#     apt-get upgrade -y && \
#     apt-get install -y vim && \
#     apt-get install -y libpq-dev && \
#     apt-get install -y python3-dev && \
#     apt-get install -y gcc && \
#     pip install -r requirements.txt --no-cache-dir && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# # Copy the rest of the application code
# COPY . .

# # Copy wait-for-it script
# ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /usr/local/bin/wait-for-it
# RUN chmod +x /usr/local/bin/wait-for-it

# # Run migrations during the image build process
# RUN python3 manage.py makemigrations && \
#     python3 manage.py migrate && \
#     python3 manage.py collectstatic --noinput

# # Expose port for the Django application
# EXPOSE 8000

# # Define the default command to run when the container starts
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]





# # Step 1: Create Docker Volume for PostgreSQL
# # docker volume create pgdata

# # # Step 2: Run PostgreSQL Container with Volume
# # docker run -d --name my-postgres-container \
# #   -e POSTGRES_DB=mydatabase \
# #   -e POSTGRES_USER=myuser \
# #   -e POSTGRES_PASSWORD=mypassword \
# #   -v pgdata:/var/lib/postgresql/data \
# #   my-postgres-image
