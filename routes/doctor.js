const intentFunctions = require('../helpers/chatbot/intentResponse');
const getReply = function(chatResponse, done) {
    let result = chatResponse.result;
    const parameters = result.parameters;
    const intentName = result.metadata.intentName;

    if (Object.keys(parameters).length !== 0) {
        intentResponse[`${intentName}`](parameters, function(reply) {
            done(reply);
        });
    }

    else if (result.contexts.length !== 0) {
        intentResponse[`${intentName}`](result.contexts[0].parameters, function(reply) {
            done(reply);
        });
    }

    else {
        intentResponse[`${intentName}`](function(reply) {
            done(reply);
        });
    }
};

// Maps intents with the functions
const intentResponse = {
    preventionTips: intentFunctions.suggestPreventionTips,
    CheckMalariaSymptoms: intentFunctions.CheckMalariaSymptoms,
    medicineSafeCheckQuestion: intentFunctions.medicineSafeCheck,
    medicineSideEffects: intentFunctions.medicineSideEffects,
    Medicine: intentFunctions.suggestMedicine,
    introductionMalaria: intentFunctions.introductionMalaria,
    fallback: intentFunctions.onFallback
};
module.exports = getReply;
