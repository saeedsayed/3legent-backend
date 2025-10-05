import jwt from "jsonwebtoken"

export default (payload, res) => {
    const expireIn = 7 // days count of expire token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expireIn + 'd' })
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10s' })
    res.cookie('jwt', token, {
        maxAge: expireIn * 24 * 60 * 60 * 1000, // convert form day to MS
        // httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // for cross-site cookie
        secure: process.env.NODE_ENV === 'production' // send cookie only on https
    })
    return token
}