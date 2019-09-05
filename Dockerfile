FROM circleci/android:api-29-node
RUN wget https://services.gradle.org/distributions/gradle-5.4.1-bin.zip -P /tmp
RUN sudo unzip -d /opt/gradle /tmp/gradle-*.zip
RUN echo 'export GRADLE_HOME=/opt/gradle/gradle-5.4.1' >> $BASH_ENV
RUN echo 'export PATH=$PATH:/opt/gradle/gradle-5.4.1/bin' >> $BASH_ENV
RUN source $BASH_ENV
