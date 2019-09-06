FROM circleci/android:api-29-node

# Install the dependencies
RUN sudo apt-get update
RUN sudo apt-get install openssl
RUN sudo apt-get install curl
RUN sudo apt-get install sed
RUN sudo apt-get install wget

# Copy the upload-playstore
COPY deploy.sh /home/circleci/deploy.sh