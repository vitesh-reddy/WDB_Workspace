const myLogger = (req, res, next) => {
  try {
    const sem = req.query?.sem;
    if(!sem)
      return res.json({message: "Sem value is required"});
      
    if(sem < 4)
      return res.json({message: "You are not allowed"});
    console.log("Got request to path:", req.path);
    next();
  } catch (err) {
    
  }
}

export default myLogger;