const getReply = function(chatResponse, done) {
    let result = chatResponse.result;
    const parameters = result.parameters;
    const intentName = result.metadata.intentName;
    if (intentName === 'CheckMalariaSymptoms') {
        CheckMalariaSymptoms(parameters, function(reply) {
            done(reply);
        });
    } else if (intentName === 'medicineSafeCheckQuestion') {
        const contextParameters = result.contexts[0].parameters;
        medicineSafeCheck(contextParameters, function(reply) {
            done(reply);
        });
    } else if (intentName === 'medicineSideEffects') {
        medicineSideEffects(parameters, function(reply) {
            done(reply);
        });
    }
}


const CheckMalariaSymptoms = function(parameters, done) {

    const symptomScores = {
        chills: 2,
        fatigue: 2,
        fever: 2,
        malaise: 2,
        shivering: 2,
        sweating: 2,
        headache: 1,
        nausea: 1,
        'pain in muscles': 1,
        'faster heart rate': 1
    }

    const symptoms = parameters.Symptoms;
    let length = symptoms.length;
    let malariaRisk = 0;

    symptoms.forEach(function(symptom) {
        malariaRisk += symptomScores[symptom];
        if (--length === 0) {
            generateSymptomsReply(malariaRisk, function(reply) {
                done(reply);
            });
        }
    });
}

const generateSymptomsReply = function(malariaRisk, done) {
    let reply;

    if (malariaRisk > 6) {
        reply = 'You seem to have quite a lot of symptoms related to malaria. Malaria can be a threat to life, please visit your doctor Immediately.';
    } else if (malariaRisk > 3) {
        reply = 'There are chances of you being infected with malaria. Malaria can be a threat to life, It is always recommended you visit your doctor if you have any doubts.';
    } else {
        reply = 'It is less likely that you are infected with malaria. However it is always recommended you visit a doctor since malaria can turn out to be life threatening.';
    }
    done(reply);
}

const medicineSafeCheck = function(contextParameters, done) {
    const gender = contextParameters.gender;
    const medicine = contextParameters.medicine;
    const age = contextParameters.age.amount;
    /**
     * Feature incomplete
     * Informaltion of Limited medicines available
     * Descision can be based upon gender medicine and age.
     */

    let reply;

    if (gender === 'male') {
        reply = 'Wrong medication may cause adverse side effects, please consult your doctor';
    } else {
        reply = 'Wrong medication may cause adverse side effects, malaria is very harmful in case of pregnancies. Please consult your doctor.';
    }
    done(reply);
}

const medicineSideEffects = function(parameters, done) {
    const medicine = parameters.medicine;
    const medSideEffects = {
        malarone: 'Malarone may cause nausea, vomiting, stomach pain, headache, diarrhea.',
        mefloquine: 'Mefloquine has some neuropsychiatric side effects, it may cause headache, nausea, dizziness and stomach upset',
        doxycycline: 'Doxycycline may cause stomach upset and sensitivity to sunlight'
    }

    done(medSideEffects[medicine]);
}

module.exports = getReply;
