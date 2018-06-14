import validator from 'validator';

class requestValidator{
  
  static modifyRequest(req, res, next){
    
    let { requestType, description } = req.body;
    
    if (requestType === undefined ){
      return res.status(404)
      .json({
        message: 'No input was received for requestType',
      });
    }
      
    if (requestType.toLowerCase() !== "maintenance" && requestType.toLowerCase() !== "repair") {
      return res.status(400)
        .json({
          message: 'requestType can only be maintenance / repair',
        });
    }

    if (description === undefined ){
      return res.status(404)
      .json({
        message: 'No input was received for description',
      });
    }
    if (validator.isEmpty(description)) {
      return res.status(404)
        .json({
          message: 'description cannot be empty',
        });
    }
     description = validator.trim(description);

    if (!validator.isLength(description,{ min: 10, max: 50 })) {
      return res.status(406)
        .json({
          message: 'description should be 10 to 50 characters long',
        });
    }

    next();
  }//End modifyRequest
    
  
  static postARequest(req, res, next) {
    let { requestType, description } = req.body;

    if (requestType === undefined ){
      return res.status(404)
      .json({
        message: 'No input was received for requestType',
      });
    }
    requestType = requestType.trim().toLowerCase();
    if (requestType !== "maintenance" && requestType.toLowerCase() !== "repair") {
      return res.status(400)
        .json({
          message: 'requestType can only be maintenance / repair',
        });
    }

    if (description === undefined ){
      return res.status(404)
      .json({
        message: 'No input was received for description',
      });
    }
    if (validator.isEmpty(description)) {
      return res.status(404)
        .json({
          message: 'description cannot be empty',
        });
    }
     description = validator.trim(description);

    if (!validator.isLength(description,{ min: 10, max: 50 })) {
      return res.status(406)
        .json({
          message: 'description should be 10 to 50 characters long',
        });
    }
    req.body.description = description;
    req.body.requestType = requestType;
    next();
  }//End postARequest

}

export default requestValidator;
