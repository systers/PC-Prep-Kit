from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import logging

from rasa_core import utils
from rasa_core.agent import Agent
from rasa_core.channels.console import ConsoleInputChannel
from rasa_core.policies.keras_policy import KerasPolicy
from rasa_core.policies.memoization import MemoizationPolicy
from rasa_core.interpreter import RasaNLUInterpreter

logger = logging.getLogger(__name__)
BATCH_SIZE = 50
EPOCHS = 200
MAX_TRAINING_SAMPLES = 300


def run_concertbot_online(input_channel,
                          domain_file="domain.yml",
                          training_data_file='data/stories.md'):
    agent = Agent(domain_file,
                  policies=[MemoizationPolicy(max_history=2), KerasPolicy()],
                  interpreter=RasaNLUInterpreter("models/nlu/default/current"))

    training_data = agent.load_data(training_data_file)
    agent.train_online(training_data,
                       input_channel=input_channel,
                       batch_size=BATCH_SIZE,
                       epochs=EPOCHS,
                       max_training_samples=MAX_TRAINING_SAMPLES)

    return agent


if __name__ == '__main__':
    utils.configure_colored_logging(loglevel="INFO")
    run_concertbot_online(ConsoleInputChannel())

