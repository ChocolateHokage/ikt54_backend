import User from '../user.js'

async function checkAdmin(req, res, next) {
  try {
    const [_user] = await User.getUserInfo({ user_id: req.body._user_id })
    if (Number(_user.access) > 0) next()
    else res.sendStatus(403)
  } catch (error) {
    console.error(new Date().toLocaleString(), "| ERROR\n", error)
    res.status(500).json(error.message ?? "Something wrong!")
  }
}
export default checkAdmin