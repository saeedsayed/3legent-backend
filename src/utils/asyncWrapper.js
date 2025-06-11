export const asyncWrapper = (asyncFn) => {
    return (req, res, next) =>{
        asyncFn(req, res, next).catch(err=>{
        console.log('err: ', err)
            next(err)
        })
    }
}