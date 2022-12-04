const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagD = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagD);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagD = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!tagD) {
      res.status(404).json({ message: 'Cannot find tag with this ID.' });
      return;
    }
    res.status(200).json(tagD);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagD = await Tag.create(req.body);
    res.status(200).json(tagD);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagD = await Tag.update(
      req.body,
      { where: { id: req.params.id } }
    );

    if (!tagD) {
      res.status(404).json({ message: 'Cannot find tag with this ID.' });
      return;
    }

    res.status(200).json(` ${req.params.id} has been updated.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagD = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagD) {
      res.status(404).json({ message: 'Cannot find tag with this ID.' });
      return;
    }

    res.status(200).json(` ${req.params.id} has been deleted`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
