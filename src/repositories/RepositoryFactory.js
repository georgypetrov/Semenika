import AuthRepository from "./AuthRepository"
import UsersRepository from "./UsersRepository"
import RoleRepository from "./RoleRepository"
import RegisterRepository from "./RegisterRepository"

const repositories = {
    'auth': AuthRepository,
    'users': UsersRepository,
    'role': RoleRepository,
    'register': RegisterRepository
};

export default {
  get: name => repositories[name]
};
