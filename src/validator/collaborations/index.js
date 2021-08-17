const InvariantError = require('../../exceptions/InvariantError');
const { CollaborationPayloadSchema } = require('./schema');

const CollaborationsValidator = {
  validateCollaborationPayload: (payload) => {
    const validaionResult = CollaborationPayloadSchema.validate(payload);

    if (validaionResult.error) {
      throw new InvariantError(validaionResult.error.message);
    }
  },
};

module.exports = CollaborationsValidator;
