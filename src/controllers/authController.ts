import * as authService from "../services/authService";

export const signUp = async (req, res) => {
  try {
    const user = await authService.signUp(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const promoteToAdmin = async (req, res) => {
  try {
    const user = await authService.promoteToAdmin(req.params.userId);
    res.status(200).json({ message: "User promoted to admin", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
