export const login = async (req, res) => {
    console.log('Login');
    res.status(200).json({ message: 'Login successful' });
}

export const register = async (req, res) => {
    console.log('Register');
    res.status(200).json({ message: 'Register successful' });
}