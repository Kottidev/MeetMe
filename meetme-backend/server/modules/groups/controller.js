import Group from './model';

export const createGroup = async (req, res) => {
  const {
    name,
    description,
    category
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: 'Name must be provided!'});
  } else if (typeof name !== 'string') {
    return res.status(400).json({ error: true, message: 'Name must be string!'});
  } else if (name.length < 5) {
    return res.status(400).json({ error: true, message: 'Name must be at least 5 characters!'});
  }

  if (!description) {
    return res.status(400).json({ error: true, message: 'Description must be provided!'});
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'Description must be string!'});
  } else if (description.length < 10) {
    return res.status(400).json({ error: true, message: 'Description must be at least 10 characters!'});
  }

  const group = new Group({ name, description });

  try {
    return res.status(201).json({ error: false, group: await group.save() });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Error when creating group'})
  }
};

export const createGroupMeetup = async (req, res) => {
  const { title, description } = req.body;
  const { groupId } = req.params;

  if (!title) {
   return res.status(400).json({ error: true, message: 'Title must be provided!'});
  } else if (typeof title !== 'string') {
    return res.status(400).json({ error: true, message: 'Title must be string!'});
  } else if (title.length < 5) {
    return res.status(400).json({ error: true, message: 'Title must be at least 5 characters!'});
  }

  if (!description) {
   return res.status(400).json({ error: true, message: 'Description must be provided!'});
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'Description must be string!'});
  } else if (description.length < 10) {
    return res.status(400).json({ error: true, message: 'Description must be at least 10 characters!'});
  }

  if (!groupId) {
    return res.status(400).json({ error: true, message: 'Group ID must be provided' });
  }

  try {
    const [meetup, group] = await Group.addMeetup(groupId, { title, description });

    return res.status(201).json({ error: false, meetup, group });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Meetup cannot be created' })
  }
}