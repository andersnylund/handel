export const createData = async models => {
  const user1 = await models.User.create({
    username: 'andersnylund',
    email: 'anders.nylund.an@gmail.com',
    password: 'verysecretpassword',
  });

  const user2 = await models.User.create({
    username: 'jdoe',
    email: 'john.doe@example.com',
    password: 'john.doe',
  });

  await models.Item.create({
    title: 'Used laptop',
    description: 'MacBook Pro 15" i7',
    price: 1000,
    userId: user1.id,
  });

  await models.Item.create({
    title: 'Bike',
    description: 'Tunturi',
    price: 60,
    userId: user1.id,
  });

  await models.Item.create({
    title: 'Lumilinko',
    description: 'Malli: Honda HS970. Työleveys 70cm.',
    price: 1850,
    userId: user2.id,
  });
};

export default { createData };
