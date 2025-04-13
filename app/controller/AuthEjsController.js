const createToken = require('../helper/CreateToken');
const User = require('../model/user')
const bcrypt = require('bcryptjs');

class AuthEjsController {

    async CheckAuth(req, res, next) {
        try {
            if (req.user) {
                next()
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            console.log(err)
        }
    }

    async register(req, res) {
        try {
            res.render('register')
        } catch (err) {
            console.log(err)
        }
    }

    async registerCreate(req, res) {
        try {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
            })
            const result = await user.save()
            console.log('data', result);

            if (result) {

                console.log('register successfully');

                res.redirect('/login')
            } else {
                console.log('register failed');

                res.redirect('/')
            }


        } catch (err) {
            console.log(err)
        }

    }

    async login(req, res) {
        try {
            res.render('login')
        } catch (err) {
            console.log(err)
        }
    }
    async loginCreate(req, res) {
        try {
            // Get user input
            const { email, password } = req.body;

            // Validate user input
            if (!(email && password)) {
                console.log('All input is required');
                res.redirect('/login');
            }
            // Validate if user exist in our database
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const tokendata = await createToken(
                    {
                        id: user._id,
                        name: user?.name,
                        email: user?.email,
                    }
                )
                if (tokendata) {
                    res.cookie('userToken', tokendata)
                    res.redirect('/dashboard');
                } else {
                    console.log('login failed');
                }
            }
            console.log('login failed');
            res.redirect('/login');
        } catch (err) {
            console.log(err)
        }
    }




    async dashboard(req, res) {
        console.log(req.user);

        try {
            res.render('dashboard', {
                data: req.user
            })
        } catch (err) {
            console.log(err)
        }
    }



    async logout(req, res) {
        try {
            res.clearCookie('userToken')
            res.redirect('/login')
        } catch (err) {
            console.log(err)
        }
    }
}


module.exports = new AuthEjsController();