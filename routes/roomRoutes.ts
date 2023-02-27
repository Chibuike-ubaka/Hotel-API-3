import express, { Request, Response, Router } from 'express';
import { RoomType } from '../models/RoomType';

const router: Router = express.Router();

// POST endpoint for storing a room type
router.post('/', async (req: Request, res: Response) => {
  const roomType = new RoomType({
    name: req.body.name
  });
  await roomType.save();
  res.status(201).json(roomType);
});

// GET endpoint for fetching all room types
router.get('/', async (req: Request, res: Response) => {
  const roomTypes = await RoomType.find();
  res.json(roomTypes);
});

// PATCH endpoint for editing a room type using its id
router.patch('/:id', async (req: Request, res: Response) => {
  const roomType = await RoomType.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!roomType) {
    return res.status(404).json({ error: 'Room type not found' });
  }
  res.json(roomType);
});

// DELETE endpoint for deleting a room type using its id
router.delete('/:id', async (req: Request, res: Response) => {
  const roomType = await RoomType.findByIdAndDelete(req.params.id);
  if (!roomType) {
    return res.status(404).json({ error: 'Room type not found' });
  }
  res.json(roomType);
});

export default router;
