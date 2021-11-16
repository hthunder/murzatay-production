FROM gitpod/workspace-mongodb
RUN sudo apt-get update  && sudo apt-get install -y rsync && sudo rm -rf /var/lib/apt/lists/*
RUN bash -c ". .nvm/nvm.sh && nvm install 10.24 && nvm use 10.24 && nvm alias default 10.24"
RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix