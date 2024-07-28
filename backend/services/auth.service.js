

const User = require("../models/usuario.model.js");

const jwt = require("jsonwebtoken");

const { ACCESS_JWT_SECRET,REFRESH_JWT_SECRET,} = require("../config/env.config.js");

const { handleError } = require("../utils/errorHandler");

async function login(user) {
    try {
      const { correo, password } = user;
  
      const userFound = await User.findOne({ correo: correo })
        .exec();
      console.log("userFound", userFound);
      if (!userFound) {
        return [null, null, "El usuario y/o contraseña son incorrectos"];
      }
  
      const matchPassword = await User.comparePassword(
        password,
        userFound.password,
      );
  
      if (!matchPassword) {
        return [null, null, "El usuario y/o contraseña son incorrectos"];
      }
  
      const accessToken = jwt.sign(
        { correo: userFound.correo, roles: userFound.rol, id: userFound._id},
        ACCESS_JWT_SECRET,
        {
          expiresIn: "30d",
        },
      );
    
  
      const refreshToken = jwt.sign(
        { correo: userFound.correo },
        REFRESH_JWT_SECRET,
        {
          expiresIn: "7d", // 7 días
        },
      );

      return [accessToken, refreshToken, null];
    } catch (error) {
      handleError(error, "auth.service -> signIn");
    }
  }

  async function refresh(cookies) {
    try {
      if (!cookies.jwt) return [null, "No hay autorización"];
      const refreshToken = cookies.jwt;
  
      const accessToken = await jwt.verify(
        refreshToken,
        REFRESH_JWT_SECRET,
        async (err, user) => {
          if (err) return [null, "La sesion a caducado, vuelva a iniciar sesion"];
  
          const userFound = await User.findOne({
            correo: user.correo,
          })
            .exec();
  
          if (!userFound) return [null, "No usuario no autorizado"];
  
          const accessToken = jwt.sign(
            { correo: userFound.correo, roles: userFound.rol },
            ACCESS_JWT_SECRET,
            {
              expiresIn: "1d",
            },
          );
  
          return [accessToken, null];
        },
      );
  
      return accessToken;
    } catch (error) {
      handleError(error, "auth.service -> refresh");
    }
  }

  module.exports = {
    login,
    refresh,
  };