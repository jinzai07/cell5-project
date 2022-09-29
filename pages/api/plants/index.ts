import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../shared/utils/db-connect';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDatabase();
  const db = client.db('plants');

  if (req.method === 'GET') {
    try {
      const allPlants = await db.collection('plant').find().toArray();

      res.status(200).json(allPlants);
    } catch (error) {
      res.status(500).json({ error });
    } finally {
      await client.close();
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, isFavorite } = req.body;

      if (!name || !description) {
        return res
          .status(422)
          .json({ message: 'Please enter name or description!' });
      }
      const plantToCreate = {
        name,
        description,
        isFavorite: isFavorite ?? false,
      };

      const create = await db.collection('plant').insertOne(plantToCreate);
      const createdPlant = await db
        .collection('plant')
        .findOne(create.insertedId);

      res.status(201).json({ data: createdPlant });
    } catch (error) {
      res.status(500).json({ error });
    } finally {
      await client.close();
    }
  } else if (req.method === 'DELETE') {
    try {
      const id = req.query.id;

      if (!id) {
        return res.status(422).json({ message: 'Please enter id to delete!' });
      }
      await db
        .collection('plant')
        .deleteOne({ _id: new ObjectId(id as string) });

      res.status(201).json({ data: 'Deleted plant!' });
    } catch (error) {
      res.status(500).json({ error });
    } finally {
      await client.close();
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, description, isFavorite, _id } = req.body;

      if (!name || !description) {
        return res
          .status(422)
          .json({ message: 'Please enter name or description!' });
      }
      const plantToUpdate = {
        $set: {
          name,
          description,
          isFavorite: isFavorite ?? false,
        },
      };

      const updateRequest = await db
        .collection('plant')
        .updateOne({ _id: new ObjectId(_id as string) }, plantToUpdate);

      const updatedPlant = await db
        .collection('plant')
        .findOne(new ObjectId(_id as string));

      res.status(201).json({ data: updatedPlant });
    } catch (error) {
      res.status(500).json({ error });
    } finally {
      await client.close();
    }
  }

  return res.status(200);
};
