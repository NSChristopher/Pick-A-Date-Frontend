FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git

# Clone the backend repository into the backend directory
RUN git clone --branch main https://github.com/NSChristopher/Pick-A-Date-Backend .

# Install any needed packages specified in requirements.txt
# Note: The requirements.txt file must be present in the directory where you build the Docker image
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_ENV=development