import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: String,
  position: String,
  profileImage: String
});

const groupSchema = new mongoose.Schema({
  name: String,
  description: String,
  color: String,
  members: [memberSchema]
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
