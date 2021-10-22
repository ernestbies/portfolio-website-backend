import validateRecaptcha from "../services/validateRecaptcha";
import contactValidation from "../utils/contactValidationSchema";

const contactController = {
    validateRecaptcha: async (req, res) => {
        const {body} = req;
        const {error} = contactValidation(body);

        if (error) {
            res.status(401).send({errorCode: 401, errorMessage: error.details[0].message});
        } else {
            try {
                const recaptchaStatus = await validateRecaptcha(body.recaptcha);

                if (recaptchaStatus) {
                    res.status(200).send({recaptcha_validation: true});
                } else {
                    res.status(401).send({recaptcha_validation: false});
                }
            } catch (error) {
                res.status(500).send({recaptcha_validation: false});
            }
        }

    }
}

export default contactController;
