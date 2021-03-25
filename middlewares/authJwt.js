const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const db = require("../models")

const User = db.user
const Role = db.role

const isLoggedIn = (req, _res, next) => {
    const { token } = req.cookies
    req.isLoggedIn = false

    if (!token) {
        return next()
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            req.isLoggedInErrors = []
            req.isLoggedInErrors.push("Bad token")
        } else {
            req.isLoggedIn = true
            req.userId = decoded.id
        }
    })
    return next()
}

// const verifyToken = (req, res, next) => {
//   // let token = req.headers['x-access-token'];
//   const token = req.cookies.token;

//   if (!token) {
//     return res.redirect('/');
//     // return res.status(403).send({ message: 'No token provided!' });
//   }

//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: 'Unauthorized' });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

const isAdmin = async (req, _res, next) => {
    try {
        req.isAdmin = false
        const user = await User.findById(req.userId)
        if (user) {
            const roles = await Role.find({ _id: { $in: user.roles } })
            if (roles) {
                for (let i = 0; i < roles.length; i += 1) {
                    if (roles[i].name === "admin") {
                        req.isAdmin = true
                        break
                    }
                }
            }
        }
    } catch (e) {
        console.error(e)
    }
    return next()
}

// const isAdmin = (req, res, next) => {
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     Role.find(
//       {
//         _id: { $in: user.roles }
//       },
//       (err, roles) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === 'admin') {
//             next();
//             return;
//           }
//         }

//         res.status(403).send({ message: 'Require Admin Role!' });
//         return;
//       }
//     );
//   });
// };

// const isAdmin = (req, res, next) => {
//   req.isAdmin = false;
//   req.errors = [];
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       // res.status(500).send({ message: err });
//       // req.isAdmin = false;
//       req.errors.push(err);
//       return next();
//     }

//     Role.find(
//       {
//         _id: { $in: user.roles }
//       },
//       (err, roles) => {
//         if (err) {
//           // res.status(500).send({ message: err });
//           // return;
//           // req.isAdmin = false;
//           req.errors.push(err);
//           return next();
//         }

//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === 'admin') {
//             req.isAdmin = true;
//             return next();
//             // return;
//           }
//         }

//         // res.status(403).send({ message: 'Require Admin Role!' });
//         // return;
//         req.errors.push('Require Admin Role!');
//         return next();
//       }
//     );
//   });
// };

const isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }

                for (let i = 0; i < roles.length; i += 1) {
                    if (roles[i].name === "moderator") {
                        next()
                        return
                    }
                }

                res.status(403).send({ message: "Require Moderator Role!" })
            }
        )
    })
}

const authJwt = {
    // verifyToken,
    isLoggedIn,
    isAdmin,
    isModerator,
}

module.exports = authJwt
