//fichier pour les tokens
const jwt = require('jsonwebtoken');

//génère un token à la connection de l'utilisateur
function generateToken(user) {
  const { _id, username, email, role } = user;
  const payload = { _id, username, email, role };
  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

  return accessToken;
}

//function to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if(authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if(err) {
        //403 c'est quand on a un token mais qu'il n'est pas bon
        return res.status(403).json("Your token is incorrect");
      }
      req.user = payload;
      next();
    })
  } else {
    //401 c'est quand on n'a pas le token
    res.status(401).json("You don't have any token");
  }
}

//a voir si ça marche bien
function refreshToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    // Vérifiez si le token expire bientôt
    const now = Date.now() / 1000; // Convertit la date en secondes
    const { exp } = decoded;

    if (exp - now > 60 * 15) { // Si le token expire dans plus de 15 minutes, on ne le rafraîchit pas encore
      return next();
    }

    // Génère un nouveau token avec une nouvelle durée de validité
    const newToken = generateToken(decoded);

    // Envoie le nouveau token au client dans un cookie sécurisé
    res.cookie('token', newToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000 // Durée de validité du cookie (ici 24 heures)
    });

    next();
  });
}

//on store le token dans un cookie
function setTokenCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true, // Empêcher l'accès au cookie depuis le code JavaScript côté client
    //Secure: true, // Utiliser uniquement pour les connexions HTTPS
    //sameSite: 'Strict',
    maxAge: 3600000 // Temps d'expiration du cookie en millisecondes (1 heure)
  });
}

//on clear le token dans le cookie
function clearTokenCookie(req, res) {
  try {
    res.clearCookie('token');
  } catch(error) {
    res.status(500).send(error);
  }
}

module.exports = {
  generateToken,
  authenticateToken,
  refreshToken,
  setTokenCookie,
  clearTokenCookie
};