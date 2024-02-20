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

// Fonction de rafraîchissement de token (à tester)
function refreshToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    // Vérifie si le token expire dans moins de 15 minutes
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