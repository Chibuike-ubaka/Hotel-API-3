const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://ChukwubuikemUbaka:<ChukwubuikemUbaka>@cluster0.iyh4rpi.mongodb.net/?retryWrites=true&w=majority', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const roomTypeSchema = new Schema({
name: { type: String, required: true },
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);

const roomSchema = new Schema({
name: { type: String, required: true },
roomType: { type: Schema.Types.ObjectId, ref: 'RoomType', required: true },
price: { type: Number, required: true },
});

const Room = mongoose.model('Room', roomSchema);



//End points
const { authenticateToken, authorize, validate } = require('./middlewares');

const express = require('express');
const app = express();
app.use(express.json());

// POST endpoint to create a room type
app.post('/api/v1/rooms-types', validate(roomTypeSchema), authenticateToken, authorize('admin'), async (req, res) => {
const roomType = new RoomType(req.body);
await roomType.save();
res.status(201).json(roomType);
});

// GET endpoint to fetch all room types
app.get('/api/v1/rooms-types', authenticateToken, async (req, res) => {
const roomTypes = await RoomType.find();
res.json(roomTypes);
});

// POST endpoint to create a room
app.post('/api/v1/rooms', validate(roomSchema), authenticateToken, authorize('admin'), async (req, res) => {
const room = new Room(req.body);
await room.save();
res.status(201).json(room);
});

// GET endpoint to fetch all rooms with optional filtering
app.get('/api/v1/rooms', authenticateToken, async (req, res) => {
const searchRoomNameMatch = req.query.search || '';
const searchRoomTypeNameMatch = req.query.roomType || '';
const searchRoomMinimumPriceMatch = req.query.minPrice || 0;
const searchRoomMaximumPriceMatch = req.query.maxPrice || Infinity;

const rooms = await Room.find({
name: { $regex: searchRoomNameMatch, $options: 'i' },
roomType: searchRoomTypeNameMatch,
price: { $gte: searchRoomMinimumPriceMatch, $lte: searchRoomMaximumPriceMatch },
});
res.json(rooms);
});

// PATCH endpoint to update a room
app.patch('/api/v1/rooms/:roomId', validate(roomSchema), authenticateToken, authorize('admin'), async (req, res) => {
const room = await Room.findByIdAndUpdate(req.params.roomId, req.body, { new: true });
res.json(room);
});

// DELETE endpoint to delete a room
app.delete('/api/v1/rooms/:roomId', authenticateToken, authorize('admin'), async (req, res) => {
await Room.findByIdAndDelete(req.params.roomId);
res.status(204).send();
});

// GET endpoint to fetch a single room by ID
app.get('/api/v1/rooms/:roomId', authenticateToken, async (req, res) => {
const room = await Room.findById(req.params.roomId);
res.json(room);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));