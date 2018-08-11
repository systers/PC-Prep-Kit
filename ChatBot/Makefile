run:
	python bot.py run

train-nlu:
	python bot.py train-nlu

train-dialogue:
	python bot.py train-dialogue

describe:
	python visualize.py

learn:
	python train_online.py

server:
	python -m rasa_core.server -d models/current/dialogue -u models/nlu/default/current -o out.log --cors "*"

train-dialogue-default:
	python -m rasa_core.train -d domain.yml -s data/stories.md -o models/current/dialogue --epochs 200

