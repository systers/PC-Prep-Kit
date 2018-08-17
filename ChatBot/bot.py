from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import argparse
import logging

from policy import CustomPolicy
from rasa_core import utils
from rasa_core.actions import Action
from rasa_core.agent import Agent
from rasa_core.channels.console import ConsoleInputChannel
from rasa_core.events import SlotSet
from rasa_core.interpreter import RasaNLUInterpreter
from rasa_core.policies.memoization import MemoizationPolicy
from rasa_core.actions.forms import (
    EntityFormField,
    FormAction
)

logger = logging.getLogger(__name__)


class ActionPatientInformation(FormAction):
    RANDOMIZE = False

    @staticmethod
    def required_fields():
        return [
            EntityFormField("gender", "gender"),
            EntityFormField("age", "age"),
        ]

    @classmethod
    def name(self):
        return 'action_patient_information'

    @classmethod
    def submit(self, dispatcher, tracker, domain):
        return [SlotSet("matches", "text")]


class ActionSuggestNormal(Action):
    @classmethod
    def name(self):
        return 'action_suggest_normal'

    @classmethod
    def run(self, dispatcher, tracker, domain):
        medicines = ['Atovaquone', 'Chloroquine', 'Doxycycline', 'Mefloquine', 'Primaquine']
        age = int(tracker.get_slot("age"))
        if age < 8:
            medicines.remove("Doxycycline")
        dispatcher.utter_message("You can take these medicines:\n" + ' '.join(medicines))
        return []


class ActionSuggestPregnant(Action):
    @classmethod
    def name(self):
        return 'action_suggest_pregnant'

    @classmethod
    def run(self, dispatcher, tracker, domain):
        medicines = ['Chloroquine', 'Doxycycline', 'Mefloquine']
        age = int(tracker.get_slot("age"))
        if age < 8:
            medicines.remove("Doxycycline")
        dispatcher.utter_message("You can take these medicines:\n" + ' '.join(medicines))
        return []


class ActionCheckMedicineNormal(Action):
    @classmethod
    def name(self):
        return 'action_check_medicine_normal'

    @classmethod
    def run(self, dispatcher, tracker, domain):
        medicines = ['ATOVAQUONE', 'CHLOROQUINE', 'DOXYCYCLINE', 'MEFLOQUINE', 'PRIMAQUINE']

        medicine = str(tracker.get_slot("medicine")).upper()
        age = int(tracker.get_slot("age"))
        if age < 8:
            medicines.remove("DOXYCYCLINE")

        if medicine in medicines:
                dispatcher.utter_message("Its safe to take the medicine!")
        else:
                dispatcher.utter_message("The asked medicine is not safe for you. You can take these medicines instead:"
                                         "\n" + ' '.join(medicines))
        return []


class ActionCheckMedicinePregnant(Action):
    @classmethod
    def name(self):
        return 'action_check_medicine_pregnant'

    @classmethod
    def run(self, dispatcher, tracker, domain):
        medicines = ['CHLOROQUINE', 'DOXYCYCLINE', 'MEFLOQUINE']
        medicine = tracker.get_slot("medicine")
        age = int(tracker.get_slot("age"))
        if age < 8:
            medicines.remove("DOXYCYCLINE")

        if medicine in medicines:
                dispatcher.utter_message("Its safe to take the medicine!")
        else:
                dispatcher.utter_message("The asked medicine is not safe for you. You can take these medicines instead:"
                                         "\n" + ' '.join(medicines))
        return []


class CheckAge(FormAction):
    RANDOMIZE = False

    @staticmethod
    def required_fields():
        return [
            EntityFormField("age", "age")
        ]

    @classmethod
    def name(self):
        return 'check_age'

    @classmethod
    def submit(self):
        return


def train_dialogue(domain_file="domain.yml",
                   model_path="models/dialogue",
                   training_data_file="data/stories.md"):
    agent = Agent(domain_file,
                  policies=[MemoizationPolicy(max_history=3),
                            CustomPolicy()])

    training_data = agent.load_data(training_data_file)
    agent.train(
        training_data,
        epochs=400,
        batch_size=100,
        validation_split=0.2
    )

    agent.persist(model_path)
    return agent


def train_nlu():
    from rasa_nlu.training_data import load_data
    from rasa_nlu import config
    from rasa_nlu.model import Trainer

    training_data = load_data('data/nlu_data/')
    trainer = Trainer(config.load("nlu_model_config.yml"))
    trainer.train(training_data)
    model_directory = trainer.persist('models/nlu', fixed_model_name="current")

    return model_directory


def run(serve_forever=True):
    interpreter = RasaNLUInterpreter("models/nlu/default/current")
    agent = Agent.load("models/current/dialogue", interpreter=interpreter)

    if serve_forever:
        agent.handle_channel(ConsoleInputChannel())
    return agent


if __name__ == '__main__':
    utils.configure_colored_logging(loglevel="INFO")

    parser = argparse.ArgumentParser(
        description='starts the bot')

    parser.add_argument(
        'task',
        choices=["train-nlu", "train-dialogue", "run"],
        help="what the bot should do - e.g. run or train?")
    task = parser.parse_args().task

    # decide what to do based on first parameter of the script
    if task == "train-nlu":
        train_nlu()
    elif task == "train-dialogue":
        train_dialogue()
    elif task == "run":
        run()

