import { getRepository } from "typeorm";
import path from 'path';
import fs from 'fs';

import User from "../models/Users";
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename}: Request): Promise<User>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change the avatar!');
    }

    if (user.avatar){
      const currentUserAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const currentUserAvatarFilePathExists =
        await fs.promises.stat(currentUserAvatarFilePath);
      if (currentUserAvatarFilePathExists) {
        await fs.promises.unlink(currentUserAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;