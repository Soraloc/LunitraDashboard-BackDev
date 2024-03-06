// Module de génération et vérification de token JWT
const jwt = require('jsonwebtoken');

// Fonction de génération de token
function generateToken(user, type) {
  const { _id, username, email, role } = user;
  const payload = { _id, username, email, role }; 
  switch(type) {
    case "SESSION":
      return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    case "VERIFY":
      return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
  }
}

// Fonction d'authentification de token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if(authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if(err) {
        // Token incorrect = 403
        return res.status(403).json("Your token is incorrect");
      }
      req.user = payload;
      next();
    })
  } else {
    // Pas de token = 401
    res.status(401).json("You don't have any token");
  }
}

// Fonction de rafraîchissement de token
function refreshToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    const decodedToken = jwt.decode(token);
    const expiration = decodedToken.exp * 1000;
    const now = Date.now();
    const delay = 15 * 60 * 1000;

    if((expiration - now) <= delay) {
      // Génère un nouveau token avec une nouvelle durée de validité
      const newToken = generateToken(decoded, "SESSION");
      console.log("nouveau : " + newToken);

      // Envoie le nouveau token au client dans un cookie sécurisé
      res.cookie('token', newToken, {
        httpOnly: true,
        maxAge: 3600000
      });

      next();
    } else {
      console.log("pas besoin de refresh");
      return next();
    }
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

// Fonction de suppression de cookie
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