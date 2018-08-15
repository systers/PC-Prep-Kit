## greet
* greet
    - utter_greet

## thankyou
* thankyou
    - utter_youarewelcome

## goodbye
* goodbye
    - utter_goodbye

##identity
* identity
    - utter_identity
    
##botPlace
* botPlace
    - utter_place
    
##prevent
* prevent
    - utter_prevent
    
##intro
* intro
    - utter_intro

## Generated Story -3337607692347301221
* medicines
    - utter_ask_gender
* Female
    - action_store_female
    - utter_ask_pregnant
* affirm
    - action_store_pregnant_true
    - action_handle_age
* safeMedicine{"age": "18"}
    - slot{"age": "18"}
    - action_suggest_pregnant
    - export

## Generated Story 1709276491840240623
* medicines
    - utter_ask_gender
* Male
    - action_store_male
    - action_handle_age
* deny{"age": "6"}
    - slot{"age": "6"}
    - action_suggest_normal
    - export

## Generated Story 8225679472378621042
* medicines
    - utter_ask_gender
* Female
    - action_store_female
    - utter_ask_pregnant
* deny
    - action_store_pregnant_false
    - action_handle_age
* safeMedicine{"age": "20"}
    - slot{"age": "20"}
    - action_suggest_normal
    - export

## Generated Story 1977540417917074948
* medicines
    - utter_ask_gender
* informThird
    - action_store_third
    - action_handle_age
* informAge{"age": "40"}
    - slot{"age": "40"}
    - action_suggest_normal
    - export

## Generated Story -1629930783082600737
* medicines
    - utter_ask_gender
* Female
    - action_store_female
    - utter_ask_pregnant
* affirm
    - action_store_pregnant_true
    - action_handle_age
* informAge{"age": "45"}
    - slot{"age": "45"}
    - action_suggest_pregnant
    - export

## Generated Story 1487877193561016511
* safeMedicine{"medicine": "Atovaquone"}
    - slot{"medicine": "Atovaquone"}
    - utter_ask_gender
* Male
    - action_store_male
    - action_handle_age
* informAge{"age": "20"}
    - slot{"age": "20"}
    - action_check_medicine_normal
    - export
    
## Generated Story -5865417217711091099
* safeMedicine{"medicine": "Doxycycline"}
    - slot{"medicine": "Doxycycline"}
    - utter_ask_gender
* Female
    - action_store_female
    - utter_ask_pregnant
* affirm
    - action_store_pregnant_true
    - action_handle_age
* informAge{"age": "24"}
    - slot{"age": "24"}
    - action_check_medicine_pregnant
    - export

## Generated Story -7286025381817857709
* safeMedicine{"medicine": "Atovaquone"}
    - slot{"medicine": "Atovaquone"}
    - utter_ask_gender
* informThird
    - action_store_third
    - action_handle_age
* informAge{"age": "4"}
    - slot{"age": "4"}
    - action_check_medicine_normal
    - export
