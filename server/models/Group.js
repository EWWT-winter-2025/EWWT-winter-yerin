import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: String,
  description: String,
  color: String,
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
