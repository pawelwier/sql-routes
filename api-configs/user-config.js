module.exports = {
  get: [
    {
      name: 'basic',
      fields: ['id', 'firstName'],
      modify: data => [
        ...data,
        {
          firstName: 'karol'
        }
      ]
    },
    {
      name: 'names',
      fields: ['firstName','lastName'],
    },
    {
      name: 'when',
      fields: ['createdAt']
    }
  ],
  post: [
    {
      name: 'basic',
      fields: ['firstName', 'lastName', 'email'],
    },
  ],
}
