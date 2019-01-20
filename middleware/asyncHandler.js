module.exports = (funcToHandle)=>{
    return async (req, res, next)=>{
        try{
            await funcToHandle(req, res);
        }
        catch(err){
            next(err)
        }
    }
}