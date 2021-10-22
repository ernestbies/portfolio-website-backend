import Joi from "joi";

const contactValidation = body => {
    const validationSchema = Joi.object({
        recaptcha: Joi.string().required()
    });

    return validationSchema.validate(body);
}

export default contactValidation;
