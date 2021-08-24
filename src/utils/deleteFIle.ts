import fs from 'fs';

export const deleteFile = async (filename: string): Promise<void> => {
  /**
   * o stat informa se esse arquivo existe
   */
  try {
    await fs.promises.stat(filename);
  } catch (error) {
    return;
  }
  await fs.promises.unlink(filename);
};
