import md5 from 'md5'
import UserService from './user.service.js'

class UserController {
    login(req, res, next) {
        UserService.login(req.body, (err, result) => {
            if (err) next(err)
            else {
                if (!result.err) {
                    res.cookie('tokenS', result.tokenS, {
                        sameSite: "lax",
                        secure: false,
                        httpOnly: true,
                        path: '/',
                        maxAge: req.body.rememberMe ? 1000 * 60 * 60 * 24 * 7 : 1000 * 60 * 60 * 24 * 30
                    })

                    delete result.tokenS
                    delete result.err
                    res.json({ ...result })
                }
                else res.status(400).json({ message: 'Incorrect login or password' })
            }
        })
    }

    logout(req, res, next) {
        UserService.logout(req.body, (err, result) => {
            if (err) next(err)
            else {
                res.clearCookie('tokenS').json({ message: 'Successful logout' })
            }
        })
    }

    async updateUser(req, res, next) {
        try {
            const _user = await UserService.updateUser(req.body)
            res.cookie('tokenS', _user.tokenS, {
                sameSite: "lax",
                secure: false,
                httpOnly: true,
                path: '/',
                maxAge: req.body.rememberMe ? 1000 * 60 * 60 * 24 * 7 : 1000 * 60 * 60 * 24 * 30
            })
            res.json('Success')
        }
        catch (e) {
            next(e)
        }
    }

    getActiveUserInfo(req, res, next) {
        UserService.getActiveUserInfo(req.cookies, (err, result) => {
            if (err) next(err)
            else {
                res.cookie("tokenS", result[1], {
                    sameSite: "lax",
                    secure: false,
                    httpOnly: true,
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 24 * 7
                })
                res.json({ ...result[0] })
            }
        })
    }
}
export default new UserController()