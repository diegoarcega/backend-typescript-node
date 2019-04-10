import * as mongoose from 'mongoose'

export const UsersSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
  role: String,
})
